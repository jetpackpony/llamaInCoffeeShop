import * as PIXI from 'pixi.js';

export default function loadImages(imgUrl) {
  return new Promise((resolve, reject) => {
    PIXI.loader
      .add(imgUrl)
      .load(() => {
        resolve(PIXI.loader.resources[imgUrl].textures);
      });
  });
};
