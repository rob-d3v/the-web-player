# Changelog

All notable changes to `ania-avatar-react` are documented here.

## [Unreleased]

### Fixed — the runtime wait timed out on tick count, not on time
The 15-second bound added in 1.13.0 counted interval callbacks
(`waited += 100`) and assumed each one arrived 100 ms after the last. A
background or hidden tab is throttled to roughly one timer callback per
MINUTE, so on the tab a phone user had switched away from, "15 seconds"
became about two and a half hours — which is precisely the situation the
bound existed to handle. It measures elapsed wall-clock time now.


### Fixed — the mouth no longer hangs open after a sentence
The silence branch walked to the closed-mouth frame at up to 3 frames per tick,
which makes the close time proportional to the DISTANCE — and the distance is
wherever the ping-pong sweep happened to be when the audio stopped, up to half
the talk range. Measured in a real browser on a 251-frame range: **1.9 s** to
shut the mouth after a sentence, on every machine, because the cap and not the
frame rate was the bottleneck.

The budget is a deadline now: shut within `closeMs` (default 200) of the gate
going quiet, with the per-tick step derived from the measured poll interval,
floored at `maxSnapStep` so short distances still animate, and ceilinged at a
tenth of the range so it never reads as a cut. Worst case **2800 ms -> 333 ms**;
measured end to end in the browser harness at **380 ms**.

### Fixed — the chat is usable on a phone again
Reported with a screenshot at ~478x826: the user's own message cut off, the
avatar filling the top half, the input row under the browser chrome.

- **The transcript never scrolled while a flow node was live.** The scroll
  effect bailed on `flowNodeActive` — correct in v1.7.0, when the question and
  its options lived inside the transcript, obsolete since v1.7.1 moved both
  out. Nothing else scrolls on a new message, so the newest bubble rendered
  past the visible edge.
- **Only the transcript could shrink.** The avatar stage, the flow region, the
  input bar and the error toast were all `flexShrink: 0`, so the transcript
  absorbed every squeeze and collapsed to a fifth of the screen. The stage and
  the flow region now yield, with floors. The flow region's own answer scroller
  finally engages, which is what stops six quick-replies from eating the
  conversation.
- **`vh` -> `dvh`, in all seven places**, plus `env(safe-area-inset-bottom)` on
  the input row and the sheet inset. On mobile `vh` is the LARGE viewport: at
  826px visible the page reports 950, and the bottom of the widget went under
  the URL bar. The two conflicting viewport clamps are one clamp now.
- **A failed send printed the apology twice**, as a transcript bubble and as a
  sticky chip that only cleared on the next send. The bubble stays; `error` is
  reserved for failures with no bubble to live in, such as a missing webhook
  URL.

### Added — `onError` on `<AniaAvatar>`, and a bounded wait for the runtime
The wait for `window.AniaPlayer` polled every 100 ms forever and never set an
error, so a host page that ships no `aniaplayer.min.js` showed
"Carregando avatar..." for the life of the tab — and could not open its chat at
all, because `<AvatarChatbot>` stays minimised until the avatar reports loaded
and a dead avatar reports nothing.

The wait is bounded at 15 s, the failure is surfaced through the new `onError`
prop, and the chat opens without a face. It never needed one.


### Fixed — speech end is an audio event, not a timer
`postTalkDelay` defaulted to **1500 ms** in `<AvatarChatbot>`, and the avatar
kept talk-cycling for all of it after the last chunk's real `ended` event. That
is the "the sound stops but the avatar keeps talking" report: a timer, not a
fault in the audio path.

Talk state is now split the way the desktop splits it:
- **session** (`isTalking`, React) — "a reply is being spoken". Driven only by
  real `audio.onplay` / `utterance.onstart` / queue-drained events, and it
  selects the talk frame *range*.
- **voicing** (runtime) — "sound is coming out right now". Driven by the audio
  envelope, and it decides whether the mouth *moves*.

So `isTalking` staying true across the inter-chunk gap is now correct: the
avatar is mid-reply, on talk frames, mouth shut because the gate says silence.
`chunkGapMs={1000}`, which eight consumer apps pass, no longer means a second of
flapping at nothing.

- `hardStop()` and queue-drain now call `forceLipsClosed()` on the controller.
- Talk activation is immediate and unconditional — it fires from an event that
  means audio is *already* audible, so every delay that used to sit there was
  postponing the mouth while sound was playing.
- `useLipSync` gains `getRms()`. `getAmplitude()` returns the window's PEAK,
  which for speech runs 2-3x the RMS and jumps between frames; the voicing
  gate's threshold is calibrated in RMS. Both are wired, so a stale runtime
  falls back to the old signal.
- The browser SpeechSynthesis path exposes no waveform at all. Its `onboundary`
  event now drives `pushSyntheticOpenness()`, giving real per-syllable movement
  through the same envelope instead of a binary talk/idle flap. (Chrome fires
  `onboundary` only for local voices; remote ones keep the coarse behaviour.)
- `useLipSync` is no longer gated on `ttsProvider !== 'browser'`.

### Changed — default lip sync on, default auto-fetch off
`lipSyncEnabled` now defaults to **true**: the sweep model needs no openness map
(the voiced branch never consults one), so it costs nothing and touches no
network.

`lipSyncAutoFetch` therefore now defaults to **false**. Leaving both on would
have made every host page issue a third-party request to the lip sync server on
mount — a CSP break, a privacy-notice item, and a new hard dependency in the
first-paint path. Maps authored into the `.ania` still apply with zero network.

### Deprecated
- `pauseThreshold`, `talkStartDelay`, `minTalkDuration`, `minIdleDuration` —
  ignored, warn once each. Every one existed to paper over the missing voicing
  gate. `minIdleDuration` in particular *delayed the mouth opening while audio
  was already playing*.
- `detectAudio` — warns. It has never worked: the analyser was created but no
  source was ever connected, so it always read zeros.
- `lipSyncAudioRef` — warns. Accepted but never read.

### Fixed — one visitor's conversation no longer leaks into another's
Reported as "when I interact with the avatar on one PC, the other PC has
progress". The leak was never client side — `localStorage` is origin- and
profile-scoped and cannot cross machines. It was a chain of three:

1. `useChatbot` only put a `sessionId` in the body when a **flow** was active.
   `buildFlowMetadata()` returned `{}` otherwise, and the `ask:` command verb
   sent no metadata at all.
2. The backend proxies drop `X-Hermes-Session-Id` when that value is blank.
3. Receiving no header, the agent falls back to deriving a session id from
   `SHA-256(system_prompt + first user message)` — byte-identical for every
   visitor who opens with the same text against the same persona. Everyone
   landed in one shared transcript.

- New `src/utils/device-id.js`: `getDeviceId` / `resetDeviceId` /
  `DEVICE_ID_KEY`. `crypto.randomUUID` persisted under `ania.deviceId.v1`, with
  a `localStorage → sessionStorage → in-memory` fallback chain so Safari private
  mode and blocked-storage browsers still get a *stable* id rather than a new
  one per request.
- `useChatbot` sends `deviceId` and a per-tab `sessionId` on **every** request,
  as body fields *and* as `X-Ania-Device-Id` / `X-Ania-Session-Id` headers — the
  headers because a host supplying its own `formatRequest` reshapes the body
  entirely and identity has to survive that.
- `buildFlowMetadata()` no longer returns `{}` when no flow is mounted, and the
  `ask:` verb now passes metadata.
- `clearMessages()` starts a new backend conversation, not just a cleared list.
  The `deviceId` is deliberately NOT reset: same browser, new conversation.

> **Privacy.** `deviceId` is a persistent cross-session identifier — a tracking
> cookie by another name, used here only to keep visitors apart. It belongs in
> the host's privacy notice. `deviceIdEnabled={false}` turns it off (the backend
> then cannot distinguish visitors), and `navigator.globalPrivacyControl` is
> honoured automatically by downgrading to a per-tab id that never touches disk.

This is the client half. The backend proxies must also stop dropping the header
and must set `X-Hermes-Session-Key`; the agent's derive-from-prompt fallback
should fail closed. Those are separate changes in separate repos.

### Fixed — frame pacing no longer aliases against the poll rate
Found by feeding a speech-shaped waveform through the built bundle at 30, 60 and
120 Hz (`npm run harness:runtime`). Asking for 24 fps actually produced
**14.3 / 20.4 / 22.7 fps**, depending on the display.

The gate was `if (now - lastFrameTime < interval) return;` followed by
`lastFrameTime = now`. Because `now` is when the poll happened rather than when
the frame was *due*, every frame gets pushed out to the next poll boundary and
the remainder is discarded — so the effective rate is always at or below target,
by an amount that depends on how the poll rate and the interval beat together.

This was invisible until now: the interval used to be ~7.8 ms (the 128 fps bug),
shorter than any poll period, so every poll advanced a frame and playback simply
ran at the display's refresh rate. Clamping to a real 24-30 fps is what exposed
it. Carrying the remainder in an accumulator makes the average rate correct
regardless of poll phase, with a re-anchor after a stall so a returning tab does
not fire a burst of catch-up frames.

Measured after the fix: **24.8 / 24.5 / 23.7 fps**, spread down from 8.4 Hz to
0.8 Hz. Engaged only when the lib passes `ania_fps_clamp`, so the legacy path
stays byte-identical.

> Known hardware limit, not a defect: the sweep asks for up to 2.237x the base
> rate on loud speech, but a 30 Hz display cannot render more than 30 frame
> changes per second. On such a display the loud/quiet contrast is compressed
> (26.9 Hz measured, against 42.3 Hz at 60 and 120 Hz).

### Fixed — the mouth now follows the audio instead of chasing a number
The runtime picked a mouth frame by reading an openness value off the analyser
and then selecting the talk-range frame whose *authored* openness was nearest
it. Consecutive rendered frames could therefore be 25 frames apart — the mouth
teleported around the range chasing a value, and its motion had no relation to
the rhythm of the speech.

The desktop player does something structurally different, and it is why its lip
sync reads as correct: it sweeps the talk range back and forth **one frame per
tick** and lets the audio envelope shorten the per-frame **delay**. Louder
speech sweeps faster. The talk range in the source footage is itself an
open-close mouth cycle, so a faster sweep is simply a busier mouth. The openness
map is consulted only to locate the closed-mouth frame during silence.

The runtime extension (`player-runtime/`, ext 2.0.0-lipsync) now drives
`LipSyncDsp` + `LipAnimator`:
- the DSP and envelope advance on **every** rAF, independent of whether a frame
  is due, so the envelope is fresh at the instant the frame gate opens;
- the frame interval is the fps-clamped base multiplied by the envelope-derived
  sweep scale, bounded by `maxSweepBoost` (2.237x) so a loud passage cannot
  escape the fps clamp;
- new `forceLipsClosed()` shuts the mouth on cancel/drain. Without it the avatar
  holds whatever talk frame it was on until an audio block that will never
  arrive — the "audio stopped but it keeps talking" report;
- new `pushSyntheticOpenness()` feeds one articulation pulse, so the browser
  SpeechSynthesis path (which exposes no waveform at all) can drive real
  per-syllable movement from `onboundary` instead of a binary talk/idle flap;
- rendering freezes while the tab is hidden, and a returning tab starts from a
  zero `dt` rather than decaying every filter to its floor in one step.

Largest single-tick frame jump inside the talk range, measured by
`verify.mjs`: **25 frames before, 3 after**.

Removed `_frameForOpenness` (private; it implemented the wrong model).
`configureLipsSync` gains an optional **7th** options argument — the first six
remain a positional contract with every already-deployed bundle.

### Fixed — playback is normalised to 24-30 fps
Reported as "some avatars are slow, others are way too fast". The runtime
computes its delay as `frame_duration / speed_slider`, with nothing normalising
or bounding it. The slider is a bare divisor against a duration authored inside
the `.ania`, so what it *means* depends on the file. Nearly every consumer app
hardcodes `idleSpeed={6.4} talkSpeed={5.3}`, which against the legacy 50 ms
default is `50 / 6.4` = **128 fps**; `diario-de-obra` passes 2.8 and lands at
56 fps. Same library, same component.

- New `src/utils/frame-rate.js`: `resolveNativeFps` works out the footage's real
  frame rate (`video.fps`, else a studio-authored frame duration, else frame
  count over clip duration, else an assumed 25), and `frameIntervalMs` turns a
  speed multiplier into a bounded per-frame interval.
- `idleSpeed` / `talkSpeed` are now multipliers **relative to that native rate**
  rather than absolute divisors, so a given value means the same thing on every
  avatar.
- New `fpsClamp` prop: defaults to `{min: 24, max: 30}`, `false` restores the
  old unbounded behaviour, `{min, max}` sets a custom window.
- The clamp is applied on BOTH sides. The lib hands the runtime fps-correct,
  already-clamped durations with a neutral slider — which means an app still
  serving an old `aniaplayer.min.js` also plays correctly, since the old
  `duration / 1 / 1` is then the right answer. The runtime's new
  `getFrameDuration` override re-clamps live `setIdleSpeed`/`setTalkSpeed`
  calls, and is inert unless the lib passes `ania_fps_clamp`.

The legacy 6.4 / 5.3 / 2.8 values now pin to the ceiling, so every app carrying
the legacy preset converges on 30 fps. **The nineteen consumer apps need no
edits.**

### Removed — `src/utils/speed-calculator.js`
`calculateOptimalSpeeds` derived `idle = fps/10`, `talk = fps/5` — a
dimensionless number then used as a divisor against a millisecond duration. It
was never exported from the package root, so no consumer can be importing it.

### Deprecated
- `autoCalculateSpeed` — ignored, warns once. It disabled the heuristic above,
  which no longer exists. Use `fpsClamp`.
- `<AvatarConfigurator>`'s Idle/Talk speed sliders were re-ranged from 0.1-5 to
  0.5-1.5 (step 0.05). The clamp window is only 1.25x wide, so the old range
  mostly mapped onto its boundaries and dragging past ~1.25 did nothing.

### Added — lip sync DSP + frame animator ported from the desktop player
The desktop player's lip sync is visually correct and the web one is not, for a
structural reason: the web bundle picks a frame by looking the audio openness up
in a per-frame map, while the desktop **sweeps** the talk range back and forth
±1 frame per tick and lets the audio envelope shorten the per-frame *delay*.
Louder speech sweeps faster. The talk range in the source footage is itself an
open-close mouth cycle, so a faster sweep is a busier mouth. The openness map is
consulted only to find the closed-mouth frame during silence.

- `src/lip-sync/dsp.js` — `LipSyncDsp`: EMA smoothing, decaying-peak AGC, and a
  voicing gate with hysteresis (60 ms to open, 180 ms to close).
- `src/lip-sync/animator.js` — `LipAnimator` + `findClosedFrame`: the boost,
  the asymmetric attack/release envelope, sustain (held-vowel) detection, and
  the three frame branches (sustain / silence / voiced sweep).
- Both are exported from the package root so the player runtime bundle and the
  non-React wrappers share ONE implementation instead of each re-porting it.

Every constant is expressed as a **time** constant and re-derived from `dt` on
each call, not baked in per tick. The desktop is fed one audio block every 30 ms;
the web is polled from `requestAnimationFrame`, which is 60 Hz on most machines,
120 Hz on a high-refresh display and 0 Hz in a background tab. Per-tick
constants would make the avatar animate differently on different hardware — a
bug whose hidden variable is the reporter's monitor.

Neither module reads a clock or a random number: `dtMs` is injected. That is why
they are testable under plain `node`, and three suites (69 assertions) cover the
half-lives, the gate timing, the ±1 frame invariant, and the fact that the
residual error between 30/60/120 Hz *converges* as the tick rate rises — which
is what distinguishes real discretisation error from a constant that is still
secretly per-tick.

Not yet wired into any component; that lands with the runtime bundle.

## [1.12.1]

### Added — `extraPayload`: constant fields the host merges into every webhook POST
A host that vendors the widget often has to tell its backend something the
widget cannot know — which tenant, which route, which campaign. Until now the
only way in was `formatRequest`, which means reimplementing the whole body
(`message`, `attachments`, `availableActions`, the flow metadata) just to add
one field. `tio-marco` patched its vendored copy to do exactly that, and the
distributor's `rmtree`+`copytree` would have deleted the patch on the next sync.
The prop now lives upstream.

- `extraPayload` (default `null`) on `<AvatarChatbot>` and `useChatbot`. Its
  fields are merged **first** into the request body, so `message`,
  `attachments`, `availableActions` and the flow metadata
  (`sessionId`/`collected`/`escalate`) can never be clobbered by host config.
- With a custom `formatRequest`, the same fields are merged into the metadata
  object handed to it — again first, behind `metadata`.
- Omitted (or `null`), the outgoing body is byte-for-byte what it was before.
- Typed in `index.d.ts` on both `AvatarChatbotProps` and the `useChatbot`
  options.

## [1.12.0]

### Added — lip sync configs are pulled from the server automatically (best one wins)
Creators tune lip sync in the desktop player and publish the `.json` to the ANIA
server, keyed by the avatar's `contentHash`. The desktop player fetches it on
open; the web widget only did so if the host happened to pass `lipSyncServerUrl`
— and even then it never applied, see the fix below. Now, with `lipSyncEnabled`,
the widget looks the avatar up on its own and applies what it finds.

- New `lipSyncAutoFetch` (default `true`): with lip sync on, resolve the avatar's
  `contentHash` and fetch its published config. `lipSyncServerUrl` still overrides
  the origin (`DEFAULT_LIP_SYNC_SERVER_URL` otherwise).
- **Picks the best of several uploads.** An avatar accepts up to 10 published lip
  sync configs and half of them are drafts. The desktop shows a list and a human
  chooses; a widget on a customer's site has nobody to ask, so it downloads the
  candidates and scores them (`scoreLipSyncConfig`): talk-range coverage first,
  then mouth amplitude, then keyframe density, with the owner's "active" flag as
  a tiebreak — never enough to rescue a half-covered config. Configs whose
  keyframes fall outside this file's talk range, or that never open the mouth,
  are discarded.
- `lipSyncConfigId` pins one published config and skips the auto pick;
  `lipSyncMaxCandidates` (default 5) caps how many are downloaded.
- `onLipSyncConfig({ source, configId, configName, isActive, score, candidates,
  keyframes })` reports which config ended up driving the mouth.
- New exports: `fetchBestLipSyncConfig`, `listLipSyncConfigs`,
  `fetchLipSyncConfigById`, `parseLipSyncConfig`, `scoreLipSyncConfig`,
  `computeContentHash`, `DEFAULT_LIP_SYNC_SERVER_URL`.
- `<AvatarConfigurator>` gained a **Lip sync** section.
- Fetching runs off the mount path: the avatar plays with the `.ania`'s own
  settings and the server config swaps in when it lands. Every request has an
  8s timeout, failures are swallowed, and a late response is dropped if the
  player was replaced meanwhile.

### Fixed — server lip sync config was fetched and then silently ignored
`/json-config/fetch` returns `jsonData` as a **JSON string** (the raw R2 file),
not an object. The service handed that string straight to the component, so
`config.lips_sync_keyframes` was `undefined` and the openness map always fell
back to the file's own. Configs published from the desktop player never took
effect in the browser. `parseLipSyncConfig` now parses it (and unwraps the
`{ config: … }` / `{ lipsync: … }` shapes older uploads used).

### Added — `contentHash` fallback for files that don't carry one
`computeContentHash(frames)` — SHA-256 over the concatenated frame strings, the
same value the desktop (`license_verifier.calculate_content_hash`) and the web
studio (`computeContentHash`) compute. Used only when the `.ania` has neither a
top-level `contentHash` nor `license.contentHash`, so an older export can still
find its config on the server.

## [1.11.6]

### Added — `disabled` kill switch on `<AvatarChatbot>` and `<AniaAvatar>`
Turning the avatar off used to mean commenting the whole JSX block out (and
losing the ~40 props configured with it) or unmounting it from the host's
render logic. Now a single prop does it:

```jsx
<AvatarChatbot disabled avatarUrl="…" ttsProvider="piper" /* … */ />
```

- `disabled` (default `false`) renders **nothing** and mounts nothing: no
  `.ania` fetch/decrypt, no canvas, no Piper/Robs model download, no webhook,
  no auto-greeting, no microphone.
- The guard lives in a thin wrapper around the real component, so no hook,
  effect or network call runs while disabled — a `return null` inside the
  component would run after the hooks and still pay for the downloads.
- `<AvatarConfigurator>` gained a matching **"Desativado (não carrega nada)"**
  toggle in the Avatar section; it exports as `disabled={true}` like any other
  prop.

## [1.11.5]

### Fixed — explicit error for PERSONAL/licensed `.ania` files (web-incompatible)
A PERSONAL (licensed) export decrypts fine in the browser but keeps **every frame
AES-encrypted**: only the desktop AniaPlayer can unlock them, by fetching the
per-file decrypt key from the license server with a hardware id + client IP. The
browser has neither, so the player bundle failed on each frame and looped
`Erro ao renderizar frame N: Error: Erro ao carregar frame N` forever over a
blank canvas, with nothing pointing at the real cause. Same file opens normally
on desktop, so the password looked like the suspect — it never was.

- New `inspectAvatarFrames(avatarData)` (exported) checks the first frame for an
  image signature (WEBP/PNG/JPEG/GIF) and reports
  `{ playable, reason, licenseType, frameCount, frameFormat }`.
- `<AniaAvatar>` runs it before creating the player and throws **once** with
  `avatar.error.encryptedFrames` — naming the license type and telling the host
  to use a MARKETPLACE export. Shown in the widget's error state and via
  `onError`; also logged with the URL, license type and frame count.
- The offending file is evicted from the IndexedDB avatar cache, so re-uploading
  a MARKETPLACE file at the same URL takes effect on the next load.
- New `avatar.error.noFrames` for a file whose `video.frames` is empty.
- README: new "Avatar file types" section with the export-type matrix.

## [1.11.4]

### Fixed — `AvatarChatbot` now live-updates `idleSpeed`/`talkSpeed` props
`currentIdleSpeed`/`currentTalkSpeed` were seeded from the props only at mount, so
a host changing `idleSpeed`/`talkSpeed` at runtime (e.g. a live tuner driving the
always-on avatar) never reached the animation — only `AniaAvatar` updated live.
Added effects that re-sync the effective speed when the props change; the
in-widget speed slider still overrides locally between prop changes.

## [1.11.3]

### Added — `cropMinimized` prop (no-crop minimized avatar)
The minimized avatar badge used to always crop the edges (a zoomed center via
`object-fit: cover`). New `cropMinimized` prop controls this:

- **`false` (default)** — shows the **whole avatar, just smaller**
  (`object-fit: contain`, no crop). The canvas now fills the small badge box so
  the container's `overflow` can't clip it — this matters for the tiny 60px
  mobile badge, whose box is far smaller than the old oversized canvas.
- **`true`** — restores the classic cropped badge (`object-fit: cover`).

Forwarded through `AvatarChatbot`. `fit` continues to govern the maximized
framing.

## [1.11.2]

### Fixed — `AvatarChatbot` now forwards the `fit` prop
`AniaAvatarProps.fit` (`contain`/`cover`/`fill`) was honoured by the bare
`AniaAvatar` player but silently dropped by `AvatarChatbot`, which never passed
it down to the inner avatar. Hosts that set `fit` on the chatbot (e.g. an
always-on site avatar whose framing was tuned elsewhere) saw it ignored. The
prop is now destructured (default `contain`) and forwarded to `AniaAvatar`.

## [1.11.1]

### Fixed — portrait avatars no longer get squashed / cut off
Avatars whose `.ania` didn't carry `video.width`/`video.height` (older exports)
rendered into a square drawing buffer sized from the `width`/`height` props. The
player bundle draws each frame stretched to the buffer, so a tall avatar was
squashed into the square and clipped — and the element-level `object-fit` could
not recover it because the buffer itself had the wrong aspect ratio.

- **The drawing buffer is now sized to the frames' native aspect ratio.** When
  `video.width`/`video.height` are missing, the first frame is decoded up front
  (awaited) to read its real dimensions before the player is created — replacing
  the old async `onload` that raced `playerRef` and squashed the first frames.
- **`object-fit` is re-asserted on every style pass** (`enforceCanvasStyles`), so
  the player's draw loop can't drop `contain` and crop a portrait avatar.

### Added — `fit` prop
`fit?: 'contain' | 'cover' | 'fill'` (default `'contain'`) controls how the
maximized avatar fills its stage: `contain` shows the whole avatar letterboxed,
`cover` fills and crops the edges, `fill` stretches. Minimized still uses
`cover`. Applies live.

## [1.11.0]

### Fixed — `idleSpeed` / `talkSpeed` props are now respected and apply live
Changing `idleSpeed`/`talkSpeed` (e.g. via `<AvatarConfigurator>`) previously did
nothing: the `.ania`'s authored speed and the fps auto-heuristic both clobbered
the host value, and the speed was only read once at avatar-creation so runtime
changes never reached the animation.

- **Explicit host props now win** over the file's authored speed and the fps
  heuristic. Precedence (low → high): `1` < fps heuristic < `.ania` speed <
  explicit prop. Hosts that leave the props unset keep the file/heuristic speed
  (creator intent preserved) — the defaults changed from `1` to `undefined` to
  distinguish "unset" from "set to 1".
- **Speed changes apply live** without a remount, via the animation controller's
  `setIdleSpeed`/`setTalkSpeed` (the same path the in-widget speed controls use).

### Added — `onSendMessage` client-side responder (fake/mock provider, custom AI)
`<AvatarChatbot>` and `useChatbot` accept `onSendMessage(message, metadata)`.
When provided it replaces the webhook POST — return a string or
`{ message|content|text, attachments?, action? }`. No `webhookUrl` needed. Powers
the site playground's "fake provider" test and any custom in-app AI client.

## [1.10.1]

### Fixed — `<AniaAvatar>` no longer demands a password for MARKET .ania files
`<AniaAvatar>` threw "Password required for encrypted .ania file" whenever
`avatarPassword` was omitted, even for v3.0 MARKET files that are plain JSON
(all-zero HMAC/salt/IV, no AES). `<AvatarChatbot>` only worked because hosts
passed `avatarPassword=""` explicitly.

- **New helper `isPlainMarketAnia(buffer)`** in `src/utils/crypto.js` — sniffs
  the v3.0 header (magic + version + optional flag byte, then 64 zero bytes of
  HMAC/salt/IV) to detect unencrypted MARKET files.
- **`AniaAvatar` now fetches the file first and only requires a password when
  the file is actually encrypted.** MARKET files load with no `avatarPassword`
  prop at all; encrypted files still throw the same passwordRequired error.

## [1.10.0]

### Added — `<AvatarConfigurator>` developer-facing live config UI
The library now SHIPS its own configuration interface. Render
`<AvatarConfigurator>` to tune the avatar live and **export the resulting props
as JSX or JSON** — no code round-trips while dialing in a look/voice/behavior.

- **New component `src/components/AvatarConfigurator.jsx`**, exported from the
  index alongside pure helpers (`configuratorToJSX`, `configuratorToJSON`,
  `configuratorExportProps`, `CONFIGURATOR_SECTIONS`). TypeScript types added to
  `src/index.d.ts` (`AvatarConfiguratorProps`, `ConfiguratorField`,
  `ConfiguratorSection`, `ConfiguratorExportProps`).
- **Two usage modes.** *Controlled* — `<AvatarConfigurator value={config}
  onChange={setConfig}>` and the host renders its own `<AvatarChatbot {...config}>`.
  *Batteries-included* — `<AvatarConfigurator avatarUrl="…">` renders the avatar
  itself next to the panel (preview auto-on when uncontrolled).
- **Collapsible sections** (Avatar, Layout, Animation, TTS, STT, Chat) with
  live-editable controls for the main `AvatarChatbot` props — URL/password,
  position/size/theme/transparency, idle/talk speed + auto-calc + delays,
  TTS provider/voice/rate/pitch/lang + Piper model URLs, STT provider/lang, chat
  webhook/names/greeting/attachments/locale.
- **Export.** *Copy JSX* (formatted `<AvatarChatbot …/>`) and *Copy JSON*
  buttons. Only props that DIFFER from their defaults are emitted, so the copied
  snippet stays minimal. Secure-context clipboard with an execCommand fallback.
- **Persistence.** Last config saved to `localStorage`
  (`ania-avatar-configurator`, override via `storageKey`, disable with
  `persist={false}`), with a *Reset* button.
- **Zero new runtime deps.** Self-contained inline styles + one injected
  `<style>` block for `:focus`/`:hover`. SSR-safe (no window/document at render;
  all storage/DOM access guarded) and tree-shakeable — consumers who never
  import it pay nothing.
- **Playground** in `examples/configurator/` (build-free `index.html` +
  README) demonstrating batteries-included mode against a sample `.ania` URL.

## [1.8.0]

### Added — Streaming / chunked TTS (speak long replies sentence-by-sentence)
A long reply is no longer synthesized + spoken as one giant blocking block
(slow first-audio, unnatural delivery). `speak(text, opts)` now splits the text
at SENTENCE boundaries and feeds the pieces through a QUEUE, so the avatar
starts talking almost immediately and speaks one sentence at a time with a
natural pause between them.

- **Sentence chunker (`src/utils/tts-chunker.js`, pure + unit-tested).** Splits
  at sentence enders — `.` `!` `?` `…` / `...` and hard newlines — and
  optionally `;`/`:` (off by default). **Never splits at a comma** (a comma
  continues the same chunk). Punctuation stays attached to its chunk.
  Pragmatic abbreviation/number handling: does NOT split on a `.` that is
  clearly mid-token — single-capital initials ("R. Pereira"), known
  abbreviations ("Dr.", "Sr.", "Sra.", "etc."), decimals/thousands ("3.14",
  "1.500", "R$ 1.500,00"), and domains/file-exts ("aniamodels.shop",
  "index.html"). Very short fragments (< ~12 chars) are merged into the
  neighbouring chunk so the avatar never speaks a 1-word blip. Optional
  `maxChunkChars` hard-wraps comma-spliced run-ons.

- **Streaming queue in `useTTSDetection`.** chunk 1 starts ASAP; while it plays
  the NEXT chunk is synthesized (PREFETCH), so the gap between sentences is just
  the configured pause, not a re-synthesis stall — that's the latency win. After
  each chunk a configurable `chunkGapMs` (~1000 ms) pause is inserted, then the
  next plays. `isTalking` stays true across the WHOLE queue and only goes idle
  after the last chunk + trailing gap. The lip-sync `audioRef` is repointed to
  the currently-playing chunk's `<audio>` and a new `onChunkAudio(audioEl)`
  callback fires per chunk so the host reconnects its analyser (mouth tracks
  each sentence).

- **All providers stream.** Browser `speechSynthesis` (one utterance per chunk,
  `onend` → gap → next), Piper (browser ONNX, per-chunk buffer, prefetch next),
  and cloud TTS (`tiktok`/`elevenlabs`/`google`/`azure` — per-chunk fetch + play,
  prefetch next).

- **Cancel is clean.** `cancel()`, a fresh `speak()`, or `cancelPrevious:true`
  bump a generation token that invalidates every in-flight synth/gap callback,
  stop the current `<audio>` / `speechSynthesis`, abort in-flight fetches, revoke
  all object URLs, and reset `isTalking`. No overlap, no leaked audio.

- **New config (opts + `AvatarChatbot` props), backward compatible.**
  `ttsChunking` (default `true`), `chunkGapMs` (default `1000`), `maxChunkChars`
  (default `0` = off). `ttsChunking=false` or a single-sentence text behaves
  exactly like before (one-shot synth, no inter-chunk gap). The greeting /
  flow-prompt speak path and the AI-reply speak path (`onResponse`) both route
  through the queue.

- **Tests** in `examples/`: `test-tts-chunker.mjs` (splits on `.`/`!`/`?`/`…`/
  newline not comma; abbreviations/numbers/domains not split; short-fragment
  merge; semicolon opt-in; hard-wrap; edge cases) and `test-tts-queue.mjs`
  (chunk order preserved, no audio overlap, next-chunk prefetch during current
  playback, inter-chunk gap present). `npm test` runs them.

## [1.7.2]

### Fixed — Flow `{var}` interpolation now reaches ALL user-facing strings (live browser bug)
- **Input validation errors interpolate `{name}` (and any captured var).** A
  flow-authored `errorMsg` such as `"Esse telefone tá estranho, {name}. Confere o
  DDD…"` previously rendered the LITERAL token `{name}`. The validation itself was
  correct — only the error string skipped interpolation. The engine now resolves
  `inputError` through the SAME `resolvePrompt(collected)` path used for prompts:
  i18n key → text, then `{var}`/`{{var}}` filled from `collected`. The error is
  returned from `useFlowEngine` already fully resolved (render it directly).
- **Every user-facing flow string interpolates now**, not just prompts: input
  **placeholders**, **submit/skip** button labels, and option **labels** all flow
  through the new `resolveText()` (i18n + interpolation). A new `resolveText` is
  exposed from `useFlowEngine`; `resolveLabel` is now an alias of it. Optional
  `FlowInput.skipLabel` added (i18n key or literal, `{var}`-interpolated).

### Fixed — Reload now RESUMES instead of restarting at consent (returning-visitor bug)
- **Persistence saves the REAL current node id on every transition** (it already
  did, but the restore path ignored it). A returning visitor who had passed the
  consent step no longer re-does consent or re-answers already-captured fields.
- **New `RESUME` action + restore logic.** On mount, when consented persistence
  exists (`collected[consentKey]` truthy) and a real saved `currentNodeId` is
  present, the hook dispatches `RESUME` to land the visitor back at the saved node
  instead of replaying `START`. If we resume from start anyway, `START` now
  **auto-skips the consent node** (when consent was already given) **and any
  already-answered input** (skip-known), landing the user at the first unanswered
  step. A declined consent is NOT treated as consent (still asks).
- **First-run is unchanged.** With no persisted state (or no consent), `START`
  still enters the consent/start node and speaks its prompt. Persistence stays
  consent-gated — nothing is written before consent is accepted.

### Fixed — Returning greeting personalizes consistently, independent of flow authoring
- On `RESUME`, when `collected.name` (or `nome`/`firstName`/`fullName`) is known
  AND the landing node's prompt does NOT already name the user, the engine
  prepends a personalized **"Bem-vindo de volta, {name}!"** greeting (shown and
  spoken). When the landing prompt already names the user, no redundant greeting
  is added. With no known name, the greeting resolves cleanly with no raw braces.
  Hosts can override via `chat.flow.welcomeBackNamed` / `chat.flow.welcomeBack`.

## [1.7.1]

### Fixed — Flow question no longer buried by its options (live UX bug)
- **The current flow QUESTION is now PINNED, prominent, and always visible above
  its answers.** When a bubble-flow node asks something, the question that the
  avatar says/asks is rendered as a bold, larger header (`clamp(15px,4.2vw,18px)`,
  `font-weight:700`, accent rule) in a dedicated **flow interaction region** that
  sits below the transcript. The answer affordances — option bubbles OR the typed
  input — render in their OWN independently-scrolling sub-area *below* the pinned
  question. The options can no longer scroll the question out of view.
  Previously, when a node rendered its options the view auto-scrolled to the
  bottom, pushing the question off-screen ("não dá pra ler o que foi dito" — the
  user had to scroll UP to read what was asked, reported live on housestudio.online).
- **Auto-scroll reworked.** When a NEW flow node enters, the view now scrolls the
  pinned question to the TOP of the visible area (`scrollIntoView({ block:'start' })`)
  so the question reads first; the user then scrolls down to the options. The old
  scroll-to-bottom behavior is KEPT ONLY for free-text AI chat replies (no active
  flow node), where bottom = latest reply is the right target.
- **Transcript de-duplication.** The current question is shown once (pinned); the
  most-recent flow-prompt is filtered out of the scrollable history while pinned.
  Earlier prompts (past Q&A) stay in the transcript so history is still readable.

### Improved — Responsive on small screens (mobile)
- The widget container already adapted (`min(width, calc(100vw - 24px))`); the
  chat content now follows: question + option/message text **wrap** (`overflow-wrap:
  anywhere`, `word-break`), options **stack/wrap** with `white-space:normal` and no
  horizontal overflow (`overflow-x:hidden` on scroll areas), tap targets stay
  **>=44px**, and the typed-input font is bumped to **16px** so iOS doesn't
  zoom-on-focus. The flow region is capped (`min(55vh, …)`) so question + options +
  input bar fit a phone viewport without the layout overflowing.

### Changed — Default copy (no acronyms, real-attendant framing)
- `chat.flow.escalate` default reworded away from the AI framing:
  **pt-BR** `"Falar com a IA"` → **`"Falar com um atendente"`**;
  **en** `"Talk to the AI"` → **`"Talk to a real person"`**. Presents a real
  attendant/handoff, never "IA"/"agente de IA". (Per-app authored flow text and AI
  persona are swept separately.) The library ships no built-in consent-prompt
  string — consent wording is author-supplied per-app flow JSON; only the
  consent-gating mechanism (`flowConsentKey`) lives in the lib.

## [1.7.0]

### Added — TYPED-INPUT flow nodes (free-text lead capture)
- **Flow nodes can now collect a TYPED value, not just clickable bubbles.** A
  node may carry an `input` spec — `{ key, type, placeholder, required, validate,
  errorMsg, submitLabel, next, optionalSkip, alwaysAsk }` — and the chatbot
  renders a labeled text field (or `textarea`) + a gradient submit button in the
  bubble area INSTEAD of option bubbles. `type` is `'text' | 'email' | 'tel' |
  'number' | 'textarea'`; the `<input>` gets the matching DOM `type`/`inputMode`
  and an `autocomplete` hint (name/tel/email) for mobile keyboards + autofill.
  Enter submits; an optional "Pular"/Skip bubble (when `optionalSkip:true`)
  advances without capturing.
- **Validation, lead-gen ready.** Built-in validators: `'email'`, `'phone'` (BR —
  accepts `(xx) xxxxx-xxxx`, `+55…`, or 10–13 bare digits), `'cep'` (8 digits,
  optional hyphen). `validate` may also be a raw regex source string. On an
  invalid submit the node's `errorMsg` (or `chat.flow.inputInvalid`) shows inline
  and the flow does NOT advance; on a valid submit the value is recorded into
  `collected[key]` (also honoring `collectKey`) and the flow advances to
  `input.next`. **The typed value goes ONLY into the flow's `collected` map — it
  is never spoken (TTS) and never sent to the AI webhook/`sendMessage`.** The
  avatar still SPEAKS the node prompt as usual.
- **Reducer:** new pure action `SUBMIT_INPUT(value)` → `{ state, effects }`
  (validate → capture + advance, or set `state.inputError` without advancing).
  New exports `flowNodeInput`, `flowValidateInput`. `useFlowEngine` now exposes
  `currentInput`, `submitInput(value) → { ok, error }`, and `inputError`.

### Added — Prompt variable interpolation (talk to the user by name)
- **Node prompts and option labels interpolate `{var}` and `{{var}}` from the
  `collected` map** after i18n resolution. Once an input captures
  `collected.name = "João"`, a later prompt `"Prazer, {name}! O que procura?"` is
  both SPOKEN and SHOWN as `"Prazer, João! O que procura?"`. Unknown/empty vars
  resolve to `''` (leftover spaces before punctuation are trimmed) so a missing
  value never surfaces a raw `{name}` — author greetings so they still read
  naturally without a name (e.g. `"Bem-vindo de volta, {name}!"` → `"Bem-vindo
  de volta!"`). New export `flowInterpolate`; `flowResolvePrompt` takes an
  optional `collected` 3rd arg; `useFlowEngine` exposes `resolveLabel`.
- **Escalation now carries the captured contact.** `onFlowEscalate` /
  `onEscalate` receive a `contact` object (`{ name, phone, email }`, tolerant of
  key aliases like `nome`/`whatsapp`/`mail`) alongside `collected`, and the
  synthesized webhook message addresses the user by name — so the AI greets the
  user personally and has their contact on hand after handoff.

### Added — Returning-visitor memory + known-user seeding
- **Persistence (returning visitor, same browser).** `{ sessionId, collected,
  currentNodeId }` is persisted to `localStorage` under `ania-flow-<appId|flowId>`
  (override with `persistKey`) whenever `collected` changes; on mount it is
  restored and used to seed the flow (entries older than a **30-day TTL** are
  ignored). New props `persist` (default `true`) and `persistKey`. Hook exposes
  `clearPersistedFlow()`; `reset()` clears storage. **LGPD:** when `flowConsentKey`
  /`consentKey` is set, nothing is persisted until `collected[consentKey]` is
  truthy, and a declined/withdrawn consent or a reset clears any stored state.
- **Known-user seeding (logged-in user).** New prop `initialContext` (e.g.
  `{ name, email, phone }` from the host app's auth/session) pre-seeds `collected`
  on init — merged UNDER any persisted values so the authenticated identity wins.
  An authenticated app passes the signed-in user's fields and the chat already
  knows them (greets by name, skips inputs it already has).
- **Skip-known.** An input node whose `key` already holds a VALID value (from
  seeding or persistence) auto-advances to its `next` without re-asking (chained
  transitively). Default for input nodes; force a re-ask with `alwaysAsk: true`.
  A seeded value that fails the node's validator is still asked.

### i18n
- New keys `chat.flow.submit`, `chat.flow.skip`, `chat.flow.inputInvalid`
  (en + pt-BR; other locales fall back to English).

### Notes
- Backward compatible: all changes are additive. Flows authored for 1.6.x run
  unchanged (no `input` → bubbles as before; no `initialContext`/persisted state →
  empty `collected` = today's behavior; prompts without `{var}` are untouched).
  `examples/flow-demo.json` gains a name → phone → email lead-capture chain;
  `examples/test-flow-engine.mjs` now runs 91 assertions
  (`node examples/test-flow-engine.mjs`).

## [1.6.1]

### Fixed — flow-engine production-canary hardening
- **No more raw HTTP errors leaked to users.** On a webhook failure, `useChatbot`
  now shows a friendly, localized message instead of a raw `HTTP <code>` string —
  both in the chat bubble AND in the error chip. New i18n key
  `chat.error.generic` (en + pt-BR; other locales fall back to English). The raw
  cause is logged via `console.error` for developers only.
- **Friendlier fallback copy.** The bot fallback message changed from
  *"O sistema está em desenvolvimento…"* to the localized retry copy
  (*"Tive um probleminha aqui, pode tentar de novo?"* / *"I ran into a little
  hiccup here — could you try again?"*).
- **Single auto-retry on transient failures.** On a 5xx or a network/CORS error,
  `useChatbot` now waits ~1.2 s and retries the POST once before falling back —
  masking backend cold-starts that lost first-leads in the canary. A 4xx is
  surfaced immediately (not retried). New optional `useChatbot` dep `translate`.
- **Free-text keeps flow context.** When a flow is active, typed free-text now
  carries the same rich metadata the escalate button sends — `sessionId`,
  `appId`, the flow's `collected` map, and `flowId` — so the AI keeps context
  after escalation (previously free-text sent only `{ message }`).
- **Exactly one back affordance.** The engine remains the single source for the
  back bubble; author-supplied back options are now filtered out of
  `visibleOptions` (detected by an `isBack: true` flag, a label matching the
  localized back string, or a `next` that re-targets the previous node). Existing
  flows work without re-authoring.
- **Spoken prompts are now visible in the transcript.** Entering a node appends
  its resolved prompt to the visible chat log (new reducer `message` effect +
  `useFlowEngine` `onPrompt` dep), so the running conversation shows its history
  instead of only the static greeting + current bubbles. Nodes marked
  `speak:false` still surface their prompt in the transcript (silently). When a
  flow is active the generic auto-greeting is suppressed — the flow's start-node
  prompt is the greeting — so it is not double-spoken.
- **a11y:** the message text input now has an `id`/`name` (`ania-chat-input`).

### Notes
- Backward compatible: all changes are additive or internal. Flows authored for
  1.6.0 run unchanged; the new `useChatbot` `translate` and `useFlowEngine`
  `onPrompt` deps are optional.

## [1.6.0]

### Added — NO-AI bubble/balloon flow engine
- New `useFlowEngine(flowDef, deps)` hook that drives a **deterministic
  decision-tree** chat flow. The avatar SPEAKS each node's prompt and the user
  answers by tapping clickable bubbles — no LLM in the loop until an explicit
  escalation. State: `currentNode`, `backStack`, `collected` (answers map),
  `sessionId` (generated once client-side via `crypto.randomUUID` with a
  fallback), `done`/`isEscalated`. API: `{ currentNode, currentPrompt,
  visibleOptions, selectOption, goBack, canGoBack, reset, goto, collected,
  sessionId, isEscalated, isDone }`.
- The transition logic is factored into a **pure, side-effect-free reducer**
  (`src/hooks/flow-reducer.js`, exported as `flowReducer` + `flowInitialState`,
  `flowGetNode`, `flowResolvePrompt`, `flowVisibleOptions`) so it can be driven
  and tested headlessly (no React/DOM/TTS). A standalone sanity test lives at
  `examples/test-flow-engine.mjs` (`node examples/test-flow-engine.mjs`, 29
  assertions) and a demo flow at `examples/flow-demo.json`.
- New `AvatarChatbot` props: `flow` (a flow def object), `flowUrl` (lazily
  fetched JSON, ignored when `flow` is set), `appId`, `onFlowCapture`
  (`{ sessionId, appId, key, value, collected }` per captured answer — stream to
  a CRM), and `onFlowEscalate` (`{ collected, sessionId, transcript }`; defaults
  to forwarding an escalation message to the webhook via `sendMessage`).
- The current node's options render as **animated, mobile-friendly clickable
  bubbles** (min 44px tap targets, gradient fill, hover-lift, pop-in animation)
  in the message area, with an auto-shown "Voltar"/Back bubble when history
  exists and a highlighted "Falar com a IA"/escalate bubble. **Free-text input
  keeps working alongside the flow.**
- New `flow <nodeId>` command verb (and `ctx.flowGoto`) to jump the flow from
  the external-control / postMessage command surface.
- New exports: `useFlowEngine`, `flowReducer`, `flowInitialState`,
  `flowGetNode`, `flowResolvePrompt`, `flowVisibleOptions`, plus the `FlowDef`,
  `FlowNode`, `FlowOption`, `FlowState`, `FlowEffect`, `FlowAction`,
  `UseFlowEngineDeps`, and `UseFlowEngineResult` types.
- New i18n keys `chat.flow.back` / `chat.flow.escalate` (en + pt-BR; other
  locales fall back to English).

### Notes
- Backward compatible: when no `flow`/`flowUrl` prop is passed, the chatbot
  behaves identically to 1.5.0. The new surface is additive only.

## [1.5.0]

### Added — Localization (i18n)
- Built-in, **dependency-free** locale table for every user-facing string the
  library renders: greetings + waiting messages (previously hard-coded
  Portuguese in `src/constants/messages.js`), the *Enable Sound* button, the
  Idle/Talk speed-slider labels, the STT placeholder/feedback/error toasts, and
  the avatar control titles + loading/error text. No `i18next` (or any other
  runtime) is pulled in — just a tiny synchronous resolver with English
  fallback.
- **~190 languages bundled** under `src/i18n/strings/<code>.json`. `en` + `pt-BR`
  are hand-authored; the rest are machine-translated (and shipped in `files` so
  consumers get every language with zero extra fetches — locale tables are
  inlined into the bundle at build time).
- New `locale` prop on `AvatarChatbot` and `AniaAvatar` (default `'pt-BR'`, which
  preserves the library's original wording — existing apps are unaffected).
  Unknown codes fall back to the base language (`es-MX` → `es`) then to English;
  a string is never rendered as a raw key.
- New `messagesOverride` prop (`Record<string, string | string[]>`) lets a
  consumer override any individual built-in string (or the `greetings` /
  `waiting` lists) without forking the component.
- New exports: `getString`, `getStringList`, `createTranslator`,
  `availableLocales`, `hasLocale`, `DEFAULT_LOCALE`, `FALLBACK_LOCALE`, plus the
  `MessagesOverride`, `Translator`, and `I18nVars` types.
- The waiting-message TTS now speaks in the configured `ttsLang` instead of a
  hard-coded `pt-BR`.

### Notes
- Backward compatible: all existing exports and props are unchanged; the new
  surface is additive and defaults preserve today's behavior.

## [1.4.0]

### Added — Plugin architecture
- `PluginRegistry` class + `Plugin` contract (`{ id, name, version, description,
  kind: 'tts'|'stt'|'wakeword'|'action'|'integration', enabled, init?, start?,
  stop?, createEngine?, createHandler?, settingsSchema? }`), mirroring the desktop
  Ania Player `PluginBase` / `TTSEngine` / `STTEngine` / `WakeWordEngine` shapes.
- All existing providers re-expressed as registered built-in plugins (wrapping the
  working code, not rewriting it): `tts-browser`, `tts-tiktok`, `tts-elevenlabs`,
  `tts-google`, `tts-azure`, `tts-piper`, `stt-browser`, `stt-google`, `action-audio`.
- `usePlugins()` hook + `plugins`, `activeTtsPlugin`, `activeSttPlugin`,
  `onPluginsReady` props on `AvatarChatbot` to register custom plugins and resolve
  the active provider per subsystem at runtime.
- New exports: `PluginRegistry`, `getDefaultRegistry`, `PLUGIN_KINDS`,
  `validatePlugin`, `registerBuiltins`, `BUILTIN_PLUGINS`, `TTS_PROVIDER_TO_PLUGIN`,
  `STT_PROVIDER_TO_PLUGIN`, and each built-in plugin object.

### Added — Wake word detection
- `WakeWordEngine` (browser port of the Chrome extension's openWakeWord engine:
  16 kHz mono, 1280-sample frames, 12-frame buffer, threshold) in
  `src/services/wake-word.js`. `onnxruntime-web` is lazy-imported and optional —
  degrades gracefully when absent.
- `useWakeWord()` hook + `getWakeWordEngine()`, `isWakeWordSupported()` exports.
- New `AvatarChatbot` props: `wakeWordEnabled`, `wakeWordModelUrl`,
  `wakeWordThreshold`, `wakeWordWasmPaths`, `onWake` (default off).

### Added — Command / external-control API
- `executeCommand(line, ctx)` (and `parseCommandLine`, `COMMAND_LIST`) porting the
  desktop socket command set: `show`, `hide`, `toggle`, `action <id|index>`,
  `actions`, `info`, `speed <idle> [talk]`, `sensitivity <v>`, `mute`, `unmute`,
  `tts <text>`, `ask <text>` (alias `provider`), `wake`, `stop`, `help`.
- `useAniaAvatarRef()` gains `runCommand(line, extraCtx?)`.
- `installPostMessageControl(ctx, options)` + `enablePostMessageControl` /
  `postMessageOrigins` props on `AvatarChatbot` — an origin-allowlisted
  `window.postMessage({ source: 'ania', cmd })` listener lets a host page drive the
  embedded avatar.

### Added — Lip-sync parity
- `lipSyncSustainStyle` (`'hold' | 'wiggle'`) and `lipSyncWiggleSpeed` props on
  `AniaAvatar` / `AvatarChatbot`, threaded into
  `configureLipsSync(enabled, intensity, responsiveness, opennessMap, sustainStyle,
  wiggleSpeed)`. Explicit props override server config; lip sync is now configured
  even without a server URL (so the sustain knobs apply to audio-driven FFT lip sync).

### Notes
- Backward compatible: all existing exports and props are unchanged. New surface is
  additive only.
