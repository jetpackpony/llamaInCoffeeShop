import { resizeCanvas, tick, jump } from './actions';
import initGame from './initGame';
import Konva from 'konva';

import { setupCanvas, updateObjects } from './canvasObjects';

let fps = 0;
let sumFps = 0;
let lastFps = 0;
let count = 0;
const app = {
  init() {
    initGame().then((store) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      store.dispatch(resizeCanvas(width, height, dpr));

      let canvasObjects = setupCanvas('root', store.getState(), store);

      const anim = new Konva.Animation((frame) => {
        sumFps += frame.frameRate;
        count++;
        if (frame.time - lastFps > 250) {
          fps = Math.round(sumFps / count);
          sumFps = 0;
          count = 0;
          lastFps = frame.time;
        }
        store.dispatch(tick(Math.round(frame.time)));
        return updateObjects(canvasObjects, store.getState(), fps);
      }, canvasObjects.layer);
      anim.start();

      document.querySelector('body').addEventListener('touchstart', () => {
        store.dispatch(jump());
      })
    });
  }
};

app.init();
