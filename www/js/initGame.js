import initStore from './store/initStore';
import loadImages from './loadImages';

const imgUrls = {
  groundTile: 'img/groundTile.png',
  player: 'img/llama.png',
  obstacle: 'img/table.png',
  collectable: 'img/coffee.png'
};

const initGame = async function initGame() {
  let rafId = null;

  const images = await loadImages(imgUrls);
  return await initStore({ images });
};

export default initGame;
