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
  let { width, height } = canvas;
  const dpr = window.devicePixelRatio;

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#9e9ee8';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'black';
  ctx.font = "40px Arial";
  ctx.fillText(`FPS: ${frameRate}`, 10, 40);
  ctx.fillText(`width: ${width}`, 10, 90);
  ctx.fillText(`height: ${height}`, 10, 140);
  ctx.fillText(`dpr: ${dpr}`, 10, 190);

  store.pos = (store.pos + 1) % 50;
  ctx.beginPath();
  ctx.lineWidth = Math.ceil(dpr);
  ctx.arc(store.pos + width / 2, height / 2, height / 5, 0, 2*Math.PI);
  ctx.stroke();
};

export default tick;
