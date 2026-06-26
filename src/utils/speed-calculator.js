export const calculateOptimalSpeeds = (fps) => {
  if (!fps || fps <= 0) {
    return { idle: 1, talk: 1 };
  }

  const idleSpeed = Math.max(0.5, Math.min(10, fps / 10));
  const talkSpeed = Math.max(1, Math.min(10, fps / 5));

  return {
    idle: parseFloat(idleSpeed.toFixed(1)),
    talk: parseFloat(talkSpeed.toFixed(1))
  };
};
