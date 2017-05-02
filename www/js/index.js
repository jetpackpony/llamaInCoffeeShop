import { resizeCanvas, tick, jump } from './actions';
import initGame from './initGame';
import Konva from 'konva';

import { setupCanvas, updateObjects } from './canvasObjects';

const app = {
  init() {
    initGame().then((store) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      store.dispatch(resizeCanvas(width, height, dpr));

      let canvasObjects = setupCanvas('root', store.getState(), store);

      const anim = new Konva.Animation((frame) => {
        store.dispatch(tick(Math.round(frame.time)));
        return updateObjects(canvasObjects, store.getState());
      }, canvasObjects.layer);
      anim.start();

      document.querySelector('body').addEventListener('touchstart', () => {
        store.dispatch(jump());
      })
    });
  }
};

app.init();
