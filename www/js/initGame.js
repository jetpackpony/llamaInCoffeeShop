import initStore from './store/initStore';
import loadImages from './loadImages';
import loadSounds from './loadSounds';
import soundJSON from '../sound/sound';

const spriteSheetURL = "img/spriteSheet.json";

const initGame = async function initGame() {
  const images = await loadImages(spriteSheetURL);
  const sounds = await loadSounds({ ...soundJSON, src: soundJSON.urls });
  return await initStore({ images, sounds });
};

export default initGame;
