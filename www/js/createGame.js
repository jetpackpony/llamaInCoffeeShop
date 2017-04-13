import tick from './tick';

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
