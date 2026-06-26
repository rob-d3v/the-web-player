/**
 * Action audio playback — decode base64 WAV and play
 */

export const playActionAudio = (audioBase64, delayMs = 0) => {
  if (!audioBase64) return null;

  const play = () => {
    try {
      const dataUrl = audioBase64.startsWith('data:')
        ? audioBase64
        : `data:audio/wav;base64,${audioBase64}`;

      const audio = new Audio(dataUrl);
      audio.play().catch(err => {
        console.warn('[ActionRenderer] Audio playback failed:', err);
      });
      return audio;
    } catch (err) {
      console.warn('[ActionRenderer] Failed to create audio:', err);
      return null;
    }
  };

  if (delayMs > 0) {
    let audioRef = null;
    const timer = setTimeout(() => {
      audioRef = play();
    }, delayMs);
    return { cancel: () => { clearTimeout(timer); if (audioRef) { audioRef.pause(); audioRef = null; } } };
  }

  const audio = play();
  return audio ? { cancel: () => { audio.pause(); } } : null;
};
