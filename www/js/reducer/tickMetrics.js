export default (metrics, timestamp) => {
  let frameRate = metrics.frameRate;
  let frameCounter = metrics.frameCounter + 1;
  let lastFrameRateTime = metrics.lastFrameRateTime;
  if (timestamp - lastFrameRateTime > 1000) {
    frameRate = frameCounter;
    frameCounter = 0;
    lastFrameRateTime = timestamp;
  }
  return {
    ...metrics,
    frameRate,
    frameCounter,
    lastFrameRateTime
  };
};
