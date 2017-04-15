import updateFrame from './updateFrame';
import initStore from './store/initStore';
import loadImages from './loadImages';

const imgUrls = {
  groundTile: 'img/groundTile.png'
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
    }
  };
};

export default createGame;
