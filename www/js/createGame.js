import updateFrame from './updateFrame';
import initStore from './store/initStore';
import loadImages from './loadImages';
import { resizeCanvas, jump } from './actions';

const imgUrls = {
  groundTile: 'img/groundTile.png',
  player: 'img/llama.png'
};

const createGame = async function createGame(canvas) {
  let rafId = null;

  const images = await loadImages(imgUrls);
  const store = await initStore({ canvas, images });

  const loop = function loop(timestamp) {
    updateFrame(store, timestamp);
    rafId = requestAnimationFrame(loop);
  };

  return {
    start: function start() {
      rafId = requestAnimationFrame(loop);
    },

    stop: function stop() {
      cancelAnimationFrame(rafId);
    },

    resize: function resized(scale) {
      store.dispatch(resizeCanvas(scale));
    },

    touch: function touch() {
      store.dispatch(jump());
    }
  };
};

export default createGame;
