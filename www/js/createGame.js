import updateFrame from './updateFrame';
import initStore from './initStore';
import loadImages from './loadImages';

const createGame = async function createGame(canvasEl) {
  let rafId = null;
  const canvas = canvasEl;

  const images = await loadImages();
  const store = await initStore({ canvas, images });

  const loop = function loop(timestamp) {
    updateFrame(canvasEl, store, timestamp);
    rafId = requestAnimationFrame(loop);
  };

  return {
    start: function start() {
      rafId = requestAnimationFrame(loop);
    },

    stop: function stop() {
      cancelAnimationFrame(rafId);
    }
  };
};

export default createGame;
