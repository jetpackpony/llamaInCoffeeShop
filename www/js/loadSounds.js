import { Howl } from 'howler';

export default function loadSounds(soundUrl) {
  return new Promise((resolve, reject) => {
    let sounds = new Howl({ src: [soundUrl] });
    sounds.on('load', () => { resolve(sounds) });
  });
};
