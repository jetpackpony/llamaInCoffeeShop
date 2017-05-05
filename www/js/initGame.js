import initStore from './store/initStore';
import loadImages from './loadImages';

const spriteSheetURL = "img/spriteSheet.json";

const initGame = async function initGame() {
  const images = await loadImages(spriteSheetURL);
  return await initStore({ images });
};

export default initGame;
