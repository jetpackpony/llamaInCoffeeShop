import initStore from './store/initStore';
import loadImages from './loadImages';
import loadSounds from './loadSounds';

const spriteSheetURL = "img/spriteSheet.json";
const soundURL = "sound/Feel_The_Funk.mp3";

const initGame = async function initGame() {
  const images = await loadImages(spriteSheetURL);
  const sounds = await loadSounds(soundURL);
  return await initStore({ images, sounds });
};

export default initGame;
