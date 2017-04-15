import updateFrame from './updateFrame';
import initStore from './initStore';

const loadImages = function loadImages() {
  return Promise.resolve({});
};

const createGame = function createGame(canvasEl) {
  let rafId = null;
  const canvas = canvasEl;

  return loadImages()
    .then((images) => {
      return initStore({
        canvas,
        images
      });
    })
    .then((store) => {
      const loop = function loop(timestamp) {
        updateFrame(canvasEl, store, timestamp);
        rafId = requestAnimationFrame(loop);
      };

      return {
        store,

        start: function start() {
          rafId = requestAnimationFrame(loop);
        },

        stop: function stop() {
          cancelAnimationFrame(rafId);
        }
      };
    });
};

export default createGame;
