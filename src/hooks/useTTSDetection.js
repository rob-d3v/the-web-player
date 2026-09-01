import { useRef, useState, useCallback, useEffect } from 'react';
import { professionalTTSRequest } from '../services/tts-api.js';
import { chunkText } from '../utils/tts-chunker.js';

/**
 * useTTSDetection — speak + talk/idle detection, now with STREAMING/CHUNKED TTS.
 *
 * `speak(text, opts)` splits a long reply into sentence chunks (via
 * tts-chunker) and feeds them through a QUEUE: chunk 1 starts speaking ASAP,
 * and while it plays the NEXT chunk is synthesized (prefetch) so the gap
 * between sentences is just a natural pause, not a re-synthesis stall. After
 * each chunk finishes we wait `chunkGapMs` (~1s) and play the next.
 * `isTalking` stays true across the whole queue and only goes idle after the
 * LAST chunk + its trailing gap. The lip-sync `audioRef` is repointed to the
 * currently-playing chunk's <audio> so the mouth tracks each sentence; an
 * optional `onChunkAudio(audioEl)` callback fires per chunk so the host can
 * reconnect its analyser to the new element.
 *
 * Backward compatible: ttsChunking=false, or a single-sentence text, behaves
 * exactly like the previous one-shot synth (no inter-chunk gap added).
 */
/** Deprecation notices are per-key and process-wide, never per render. */
const warnedTimingProps = new Set();

export const useTTSDetection = ({
  // ---- deprecated timing knobs (1.13.0) ----
  //
  // Talk state used to be a single boolean doing two jobs, driven by timers.
  // It is now split, the way the desktop player splits it:
  //
  //   SESSION  (here)    "a reply is being spoken" — driven only by real audio
  //                      events, and it selects the talk frame RANGE.
  //   VOICING  (runtime) "sound is coming out right now" — driven by the audio
  //                      envelope, and it decides whether the mouth moves.
  //
  // So `isTalking` staying true across the inter-chunk gap is now CORRECT: the
  // avatar is mid-reply, on talk frames, with its mouth shut because the gate
  // says silence. Every knob below existed to paper over the missing voicing
  // gate, and each one caused a visible artefact of its own.
  pauseThreshold = undefined,
  talkStartDelay = undefined,
  minTalkDuration = undefined,
  minIdleDuration = undefined,
  // Retained: the session-end delay. Default 0 — the mouth is already shut by
  // the voicing gate, so there is nothing left to hide.
  idleTransitionDelay = 0,
  onTalkStart,
  onTalkEnd,
  // Fired when speech is cancelled or the queue drains, so the host can shut
  // the mouth NOW. Without it the avatar holds whatever talk frame it was on,
  // waiting for an audio block that will never arrive.
  onForceLipsClosed,
  // Fired once per word boundary on the browser SpeechSynthesis path, which
  // exposes no waveform to analyse. Lets the host drive per-syllable movement
  // instead of a binary talk/idle flap.
  onSyntheticPulse,
  ttsProvider = "browser",
  ttsConfig = {},
  // ---- streaming/chunked config ----
  ttsChunking = true,
  // Short natural beat between sentences. The synthesized audio already ends
  // with the sentence's own trailing silence, so anything near 1s reads as
  // "the bot froze" — 250ms is a breath, not a stall.
  chunkGapMs = 250,
  maxChunkChars = 0,
  minChunkChars = 12,
  // Cap the FIRST chunk so the first synthesis is tiny and speech starts
  // almost immediately; the remainder streams behind it (0 = off).
  firstChunkMaxChars = 100,
  splitOnSemicolon = false,
  // Fires with the <audio> element (cloud/piper) of each chunk as it begins to
  // play, so the host can (re)connect lip-sync to the live element.
  onChunkAudio
} = {}) => {
  const [isTalking, setIsTalking] = useState(false);

  // Warn once per key, not per render: this sits in a hook that re-runs on
  // every message.
  useEffect(() => {
    const gone = { pauseThreshold, talkStartDelay, minTalkDuration, minIdleDuration };
    for (const key of Object.keys(gone)) {
      if (gone[key] === undefined || warnedTimingProps.has(key)) continue;
      warnedTimingProps.add(key);
      console.warn(
        `[useTTSDetection] \`${key}\` is deprecated and ignored since 1.13.0. ` +
          'Mouth movement is now driven by the audio envelope (a voicing gate that ' +
          'opens ~60ms after sound starts and closes ~180ms after it stops), not by ' +
          'timers. This prop only ever existed to paper over the missing gate.'
      );
    }
  }, [pauseThreshold, talkStartDelay, minTalkDuration, minIdleDuration]);
  const pauseTimeoutRef = useRef(null);
  const idleTransitionTimeoutRef = useRef(null);
  const talkStartTimeoutRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const lastBoundaryTimeRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const audioRef = useRef(null);

  // ---- queue state ----
  // A monotonically increasing token; every new speak() / cancel() bumps it so
  // any in-flight async work (synth fetch, gap timers) checked against a stale
  // token is a no-op. This is the cancel safety net — no overlap, no leak.
  const genRef = useRef(0);
  const gapTimeoutRef = useRef(null);
  // Tracks every objectURL we created so we can revoke on cancel/teardown.
  const pendingUrlsRef = useRef(new Set());
  // The latest AbortController for an in-flight synth fetch (cloud providers).
  const synthAbortRef = useRef(null);
  // Strict single-playback lock. `isPlayingRef` is a hard guard that asserts at
  // most one chunk's audio is ever playing; `playReleaseRef` lets hardStop()
  // unblock a playback promise that is awaiting an `ended` that will now never
  // fire (because we tore the element down).
  const isPlayingRef = useRef(false);
  const playReleaseRef = useRef(null);

  // Start the talk session. Immediate and unconditional: this is called from a
  // real `audio.onplay` / `utterance.onstart`, so the sound is ALREADY coming
  // out. Every delay that used to sit here (talkStartDelay, and the remaining
  // minIdleDuration hold) postponed the mouth while audio was playing, which is
  // the wrong direction to err in.
  const activateTalk = useCallback(() => {
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    setIsTalking((prev) => {
      if (!prev && onTalkStart) onTalkStart();
      return true;
    });
  }, [onTalkStart]);

  const resetPauseTimeout = activateTalk;

  // ---- low-level: stop everything currently producing sound ----
  const revokeAllUrls = useCallback(() => {
    for (const url of pendingUrlsRef.current) {
      try { URL.revokeObjectURL(url); } catch (e) {}
    }
    pendingUrlsRef.current.clear();
  }, []);

  const hardStop = useCallback(() => {
    // Invalidate any in-flight queue work. Every async continuation in the
    // queue compares against its captured token and bails when this changes.
    genRef.current += 1;

    if (synthAbortRef.current) {
      try { synthAbortRef.current.abort(); } catch (e) {}
      synthAbortRef.current = null;
    }
    if (gapTimeoutRef.current) {
      clearTimeout(gapTimeoutRef.current);
      gapTimeoutRef.current = null;
    }
    // Shut the mouth NOW, before tearing the element down. The voicing gate
    // is fed by the analyser, and the analyser is about to go silent forever;
    // without an explicit close the avatar holds its current talk frame waiting
    // for an audio block that has just been cancelled.
    if (onForceLipsClosed) onForceLipsClosed();
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    // Fully stop the SINGLE current audio element. Strip its handlers FIRST so
    // a late `ended`/`error` from the element we're tearing down can never
    // resolve a stale playback promise or start the next chunk.
    if (audioRef.current) {
      const a = audioRef.current;
      audioRef.current = null;
      try {
        a.onended = null;
        a.onerror = null;
        a.onplay = null;
        a.pause();
        a.currentTime = 0;
        a.removeAttribute('src');
        a.src = '';
        a.load();
      } catch (e) {}
    }
    // Release the playback lock so a fresh speak() can start cleanly.
    if (playReleaseRef.current) {
      const release = playReleaseRef.current;
      playReleaseRef.current = null;
      try { release(); } catch (e) {}
    }
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    currentUtteranceRef.current = null;
    isSpeakingRef.current = false;
    isPlayingRef.current = false;
    revokeAllUrls();
  }, [revokeAllUrls, onForceLipsClosed]);

  // End the talk session (the WHOLE queue has drained).
  //
  // This used to be a bare setTimeout wired to `postTalkDelay`, whose chatbot
  // default was 1500 ms: the avatar kept talk-cycling for a second and a half
  // after the last chunk's real `ended` event. That is the "the audio stops but
  // it keeps talking" report, and it was a timer, not a bug in the audio path.
  //
  // The mouth is now already shut — the voicing gate closed it ~180 ms after
  // the waveform went quiet, before this ever runs. All that is left is to drop
  // out of the talk frame range, which needs no delay at all.
  const scheduleIdle = useCallback(() => {
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    const finish = () => {
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
      if (onForceLipsClosed) onForceLipsClosed();
      idleTransitionTimeoutRef.current = null;
    };
    if (idleTransitionDelay > 0) {
      idleTransitionTimeoutRef.current = setTimeout(finish, idleTransitionDelay);
    } else {
      finish();
    }
  }, [idleTransitionDelay, onTalkEnd, onForceLipsClosed]);

  // ===== Provider: cloud / piper (audio element per chunk) =====
  // Synthesize one chunk to an objectURL. Honors the AbortController for fetch.
  const synthChunkAudio = useCallback(async (chunkStr, signal) => {
    const { audioUrl } = await professionalTTSRequest(chunkStr, ttsProvider, ttsConfig);
    pendingUrlsRef.current.add(audioUrl);
    // professionalTTSRequest doesn't take a signal; if we were aborted mid-await
    // the caller will check the gen token and discard this URL.
    if (signal && signal.aborted) {
      try { URL.revokeObjectURL(audioUrl); } catch (e) {}
      pendingUrlsRef.current.delete(audioUrl);
      throw new DOMException('aborted', 'AbortError');
    }
    return audioUrl;
  }, [ttsProvider, ttsConfig]);

  // Play ONE prepared audioUrl to completion. STRICTLY SERIAL: the returned
  // promise only resolves on the element's real `ended` event (or a hard
  // error / cancel) — never on a timer. The caller awaits it before starting
  // the next chunk, so two chunks can never sound at once.
  const playChunkAudio = useCallback((audioUrl, myGen) => new Promise((resolve) => {
    const cleanup = () => {
      try { URL.revokeObjectURL(audioUrl); } catch (e) {}
      pendingUrlsRef.current.delete(audioUrl);
    };

    // Cancelled before we even start.
    if (genRef.current !== myGen) { cleanup(); resolve(); return; }

    // Single-playback invariant: never start a chunk while one is still
    // playing. This should not happen (callers await), but it's a hard guard.
    if (isPlayingRef.current) { cleanup(); resolve(); return; }

    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audioRef.current = audio;
    isPlayingRef.current = true;

    // Resolve exactly once; detach handlers so a late event can't re-fire it.
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      isPlayingRef.current = false;
      isSpeakingRef.current = false;
      playReleaseRef.current = null;
      try { audio.onended = null; audio.onerror = null; audio.onplay = null; } catch (e) {}
      if (audioRef.current === audio) audioRef.current = null;
      cleanup();
      resolve();
    };

    // Let hardStop() unblock us if it tears the element down mid-play (the
    // `ended` event would then never arrive).
    playReleaseRef.current = finish;

    // Notify the host (lip-sync) of the live element ONLY now that it is the
    // sole playing chunk, so the analyser reconnects to the right audio.
    if (onChunkAudio) {
      try { onChunkAudio(audio); } catch (e) {}
    }

    audio.onplay = () => {
      isSpeakingRef.current = true;
      resetPauseTimeout();
    };
    audio.onended = finish;   // the ONLY normal path to the next chunk
    audio.onerror = finish;

    audio.play().catch(() => {
      // Autoplay block / abort — treat as finished so the queue can't wedge.
      finish();
    });
  }), [onChunkAudio, resetPauseTimeout]);

  // Wait `chunkGapMs`, honoring cancel.
  const gapWait = useCallback((ms, myGen) => new Promise((resolve) => {
    if (ms <= 0 || genRef.current !== myGen) { resolve(); return; }
    gapTimeoutRef.current = setTimeout(() => {
      gapTimeoutRef.current = null;
      resolve();
    }, ms);
  }), []);

  // The cloud/piper queue runner with one-chunk-ahead prefetch.
  // Returns true if the cloud path handled playback, false if the FIRST chunk
  // failed to synthesize (so speak() can fall back to browser TTS, as before).
  const runAudioQueue = useCallback(async (chunks, myGen) => {
    const gap = chunkGapMs;

    // Per-run AbortController, captured LOCALLY so a racing speak() that swaps
    // synthAbortRef can't make this run's prefetch use the wrong controller.
    const abort = new AbortController();
    synthAbortRef.current = abort;

    // Synthesize-ahead window: keep up to PREFETCH_DEPTH chunks synthesizing
    // while earlier ones play (PLAY stays strictly serial below — we await each
    // chunk's `ended` before the next). Depth 2 hides synth time even when a
    // sentence plays faster than the next one synthesizes (common with Piper,
    // where synthesis is CPU-bound in a worker).
    const PREFETCH_DEPTH = 2;
    const ahead = []; // ahead[k] is the in-flight synth promise for chunk i+k
    let fetched = 0;  // index of the next chunk to start synthesizing
    const fillAhead = () => {
      while (fetched < chunks.length && ahead.length < PREFETCH_DEPTH + 1) {
        ahead.push(synthChunkAudio(chunks[fetched], abort.signal).catch(() => null));
        fetched++;
      }
    };
    fillAhead();

    for (let i = 0; i < chunks.length; i++) {
      if (genRef.current !== myGen) return true;

      let audioUrl;
      try {
        audioUrl = await ahead.shift();
      } catch (e) {
        audioUrl = null;
      }
      if (genRef.current !== myGen) return true;

      // If the very FIRST chunk can't synthesize, the cloud provider is broken
      // (bad key, network, model). Bail so speak() falls back to browser TTS
      // instead of going silent — matches legacy one-shot fallback behavior.
      if (i === 0 && !audioUrl) {
        return false;
      }

      // PREFETCH (synthesize-ahead only): top the window back up while chunk
      // i PLAYS. This never calls .play(); playback stays serial.
      fillAhead();

      if (audioUrl) {
        await playChunkAudio(audioUrl, myGen);
      }
      if (genRef.current !== myGen) return true;

      // Inter-chunk gap (skip after the very last chunk — we go to idle instead).
      if (i + 1 < chunks.length) {
        await gapWait(gap, myGen);
        if (genRef.current !== myGen) return true;
      }
    }

    if (genRef.current !== myGen) return true;
    // Whole queue drained -> graceful idle.
    if (synthAbortRef.current) synthAbortRef.current = null;
    scheduleIdle();
    return true;
  }, [chunkGapMs, synthChunkAudio, playChunkAudio, gapWait, scheduleIdle]);

  // ===== Provider: browser speechSynthesis (utterance per chunk) =====
  const runBrowserQueue = useCallback((chunks, myGen, options) => {
    if (!window.speechSynthesis) return;

    let i = 0;

    const speakNext = () => {
      if (genRef.current !== myGen) return;
      if (i >= chunks.length) {
        // Done -> idle.
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = null;
        }
        isSpeakingRef.current = false;
        lastBoundaryTimeRef.current = null;
        currentUtteranceRef.current = null;
        scheduleIdle();
        return;
      }

      const chunkStr = chunks[i];
      const utterance = new SpeechSynthesisUtterance(chunkStr);
      utterance.lang = options.lang || "pt-BR";
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      if (options.voice) utterance.voice = options.voice;
      currentUtteranceRef.current = utterance;

      utterance.onstart = () => {
        if (genRef.current !== myGen) return;
        isSpeakingRef.current = true;
        lastBoundaryTimeRef.current = Date.now();
        resetPauseTimeout();
      };
      utterance.onboundary = () => {
        lastBoundaryTimeRef.current = Date.now();
        resetPauseTimeout();
        // SpeechSynthesis gives us no waveform, so there is nothing for the
        // analyser to measure and the mouth would otherwise just flap on a
        // binary talk/idle. `onboundary` does fire once per word though, and
        // pushing a pulse through the SAME envelope and branch machinery gives
        // genuine per-syllable articulation. (Chrome only fires this for LOCAL
        // voices; remote ones stay on the coarse fallback.)
        if (onSyntheticPulse) onSyntheticPulse(1);
      };
      utterance.onend = () => {
        if (genRef.current !== myGen) return;
        isSpeakingRef.current = false;
        lastBoundaryTimeRef.current = null;
        i += 1;
        const isLast = i >= chunks.length;
        const gap = isLast ? 0 : chunkGapMs;
        if (gap > 0) {
          if (gapTimeoutRef.current) clearTimeout(gapTimeoutRef.current);
          gapTimeoutRef.current = setTimeout(() => {
            gapTimeoutRef.current = null;
            speakNext();
          }, gap);
        } else {
          speakNext();
        }
      };
      utterance.onerror = (event) => {
        if (event.error === "interrupted" || genRef.current !== myGen) return;
        // Skip the broken chunk, keep the queue alive.
        isSpeakingRef.current = false;
        lastBoundaryTimeRef.current = null;
        i += 1;
        speakNext();
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }, [chunkGapMs, resetPauseTimeout, scheduleIdle]);

  const speak = useCallback(async (text, options = {}) => {
    if (text == null || !String(text).trim()) return;

    // A new speak() always supersedes whatever is playing (cancelPrevious is
    // the historical opt-in; we also honor it for the queue, but a fresh speak
    // implicitly takes over so there is never overlap).
    if (options.cancelPrevious) {
      hardStop();
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
    } else {
      // Even without cancelPrevious, never let two queues run at once.
      hardStop();
    }

    // Bump gen AFTER hardStop (hardStop also bumps) and capture our own token.
    const myGen = genRef.current;

    // Decide chunking.
    const doChunk = options.ttsChunking ?? ttsChunking;
    const chunks = doChunk
      ? chunkText(String(text), {
          minChunkChars: options.minChunkChars ?? minChunkChars,
          maxChunkChars: options.maxChunkChars ?? maxChunkChars,
          firstChunkMaxChars: options.firstChunkMaxChars ?? firstChunkMaxChars,
          splitOnSemicolon: options.splitOnSemicolon ?? splitOnSemicolon
        })
      : [String(text).trim()];

    if (chunks.length === 0) return;

    // Provider selection: cloud/piper when configured + keyed; else browser.
    const keylessProviders = ['tiktok', 'piper'];
    const useCloud =
      ttsProvider !== "browser" &&
      (ttsConfig.ttsApiKey || keylessProviders.includes(ttsProvider));

    // NOTE: talk state is NOT activated here. Synthesis of the first chunk can
    // take seconds (Piper cold path), and flipping to talk frames before any
    // sound plays reads as the avatar mouthing silence. The talk state flips
    // exactly when audio actually starts: `audio.onplay` (cloud/piper chunks)
    // and `utterance.onstart` (browser TTS) both call resetPauseTimeout() ->
    // activateTalk(). This mirrors the desktop AniaAPP, whose frame switch is
    // driven by real audio playback, not by the intent to speak. It also means
    // a totally failed queue never strands the avatar in the talking state.

    if (useCloud) {
      let handled = false;
      try {
        handled = await runAudioQueue(chunks, myGen);
      } catch (error) {
        handled = false;
      }
      if (genRef.current !== myGen) return;
      // handled === true means the cloud queue played (or was cancelled).
      // handled === false means the FIRST chunk failed -> fall back to browser.
      if (handled) return;
    }

    if (!window.speechSynthesis) return;
    runBrowserQueue(chunks, myGen, options);
  }, [
    ttsProvider, ttsConfig, ttsChunking, minChunkChars, maxChunkChars,
    firstChunkMaxChars, splitOnSemicolon, hardStop, onTalkEnd,
    runAudioQueue, runBrowserQueue
  ]);

  const cancel = useCallback(() => {
    hardStop();
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    if (talkStartTimeoutRef.current) {
      clearTimeout(talkStartTimeoutRef.current);
      talkStartTimeoutRef.current = null;
    }
    lastBoundaryTimeRef.current = null;
    setIsTalking(false);
    if (onTalkEnd) onTalkEnd();
  }, [hardStop, onTalkEnd]);

  useEffect(() => {
    return () => {
      // Teardown: stop audio + clear all timers + revoke URLs.
      hardStop();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (idleTransitionTimeoutRef.current) clearTimeout(idleTransitionTimeoutRef.current);
      if (talkStartTimeoutRef.current) clearTimeout(talkStartTimeoutRef.current);
      if (gapTimeoutRef.current) clearTimeout(gapTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isTalking,
    speak,
    cancel,
    audioRef
  };
};
