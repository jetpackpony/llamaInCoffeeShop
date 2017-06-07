import { Howl } from 'howler';

export default function loadSounds(soundJSON) {
  return new Promise((resolve, reject) => {
    let sounds = new Howl(soundJSON);
    sounds.on('load', () => { resolve(sounds) });
  });
};
