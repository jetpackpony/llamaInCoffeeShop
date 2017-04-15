import updateFrame from './updateFrame';
import initStore from './initStore';

const createGame = function createGame(canvasEl) {
  let rafId = null;
  const canvas = canvasEl;
  //const store = { initPos: 100, pos: 0 };
  const store = initStore();

  const loop = function loop(timestamp) {
    updateFrame(canvasEl, store, timestamp);
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
