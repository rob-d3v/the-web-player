// Escape values before interpolating them into SSML/XML so that user
// utterances or config strings containing <, >, &, ", ' cannot break out of
// the markup (SSML-injection). Behavior-preserving for ordinary text.
const escapeXml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const professionalTTSRequest = async (text, provider, config) => {
  try {
    if (provider === "tiktok") {
      const voiceId = config.ttsVoiceId || (config.ttsGender === 'male' ? 'br_005' : 'br_003');

      const response = await fetch(`https://tiktok-tts.weilnet.workers.dev/api/generation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: voiceId
        })
      });

      if (!response.ok) {
        throw new Error(`TikTok TTS error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        const audioData = atob(data.data);
        const audioArray = new Uint8Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
          audioArray[i] = audioData.charCodeAt(i);
        }
        const audioBlob = new Blob([audioArray], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        return { audioUrl, duration: 0 };
      } else {
        throw new Error('TikTok TTS: Invalid response');
      }

    } else if (provider === "elevenlabs") {
      const voiceId = config.ttsVoiceId || "pNInz6obpgDQGcFmaJgB";
      const model = config.ttsModel || "eleven_multilingual_v2";

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': config.ttsApiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };

    } else if (provider === "google") {
      // SECURITY: Google's REST API only accepts the key as a `?key=` query
      // param, which can leak via browser history, Referer, and proxy logs.
      // Supply a BROWSER-RESTRICTED, HTTP-referrer-locked key for `ttsApiKey`
      // (restrict it to your origin in the Google Cloud console) so the
      // exposed key cannot be reused elsewhere. Prefer routing through your
      // own backend / `ttsApiUrl` proxy if you must keep the key off the wire.
      const apiUrl = config.ttsApiUrl || `https://texttospeech.googleapis.com/v1/text:synthesize?key=${config.ttsApiKey}`;

      const voiceConfig = {
        languageCode: config.ttsLang || 'pt-BR',
        name: config.ttsVoiceId || 'pt-BR-Standard-B',
        ssmlGender: config.ttsGender === 'male' ? 'MALE' : (config.ttsGender === 'female' ? 'FEMALE' : 'NEUTRAL')
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text: text },
          voice: voiceConfig,
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: config.ttsRate || 1.0,
            pitch: (config.ttsPitch - 1) * 20
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Google TTS API error: ${response.status}`);
      }

      const data = await response.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };

    } else if (provider === "piper") {
      const { initPiper, piperSynthesize } = await import('./piper-tts.js');

      if (config.piperModelUrl) {
        await initPiper(config.piperModelUrl, config.piperModelConfigUrl, {
          onProgress: config.onPiperProgress
        });
      }

      const { audioUrl } = await piperSynthesize(text, {
        speakerId: config.piperSpeakerId
      });
      return { audioUrl, duration: 0 };

    } else if (provider === "azure") {
      const region = config.ttsRegion || 'brazilsouth';
      const apiUrl = config.ttsApiUrl || `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

      const voiceName = config.ttsVoiceId || 'pt-BR-AntonioNeural';

      const ssml = `<speak version='1.0' xml:lang='${escapeXml(config.ttsLang || 'pt-BR')}'>
        <voice name='${escapeXml(voiceName)}'>
          <prosody rate='${config.ttsRate || 1.0}' pitch='${(config.ttsPitch - 1) * 50}%'>
            ${escapeXml(text)}
          </prosody>
        </voice>
      </speak>`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': config.ttsApiKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3'
        },
        body: ssml
      });

      if (!response.ok) {
        throw new Error(`Azure TTS API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };
    }

  } catch (error) {
    throw error;
  }
};
