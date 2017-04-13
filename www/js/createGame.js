let frameRate = 0;
let frameCounter = 0;
let lastFrameRateTime = 0;

const tick = function tick(canvas, store, timestamp) {
  frameCounter++;
  if (timestamp - lastFrameRateTime > 1000) {
    frameRate = frameCounter;
    frameCounter = 0;
    lastFrameRateTime = timestamp;
  }

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "15px Arial";
  ctx.fillText(`FPS: ${frameRate}`,10,30);

  store.pos = (store.pos + 1) % 50;
  ctx.beginPath();
  ctx.arc(store.pos + store.initPos, 50, 40, 0, 2*Math.PI);
  ctx.stroke();
};

const createGame = function createGame(canvasEl) {
  const canvas = canvasEl;
  const store = { initPos: 100, pos: 0 };
  let rafId = null;

  const loop = function loop(timestamp) {
    tick(canvasEl, store, timestamp);
    rafId = requestAnimationFrame(loop);
  };

  return {
    store,
    canvas,

    start: function start() {
      rafId = requestAnimationFrame(loop);
    },

    stop: function stop() {
      cancelAnimationFrame(rafId);
    }
  };
};

export default createGame;
