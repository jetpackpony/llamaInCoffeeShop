let frameRate = 0;
let frameCounter = 0;
let lastFrameRateTime = 0;

const getFPSCount = function getFPSCount(timestamp) {
  frameCounter++;
  if (timestamp - lastFrameRateTime > 1000) {
    frameRate = frameCounter;
    frameCounter = 0;
    lastFrameRateTime = timestamp;
  }
  return frameRate;
};

const tick = function tick(canvas, store, timestamp) {
  let frameRate = getFPSCount(timestamp);

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "15px Arial";
  ctx.fillText(`FPS: ${frameRate}`,10,30);

  store.pos = (store.pos + 1) % 50;
  ctx.beginPath();
  ctx.arc(store.pos + store.initPos, 50, 40, 0, 2*Math.PI);
  ctx.stroke();
};

export default tick;
