import { resizeCanvas, tick, jump } from './actions';
import initGame from './initGame';

import { setupCanvas, updateObjects } from './canvasObjects';

const app = {
  init() {
    initGame().then((store) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      store.dispatch(resizeCanvas(width, height, dpr));

      let canvasObjects = setupCanvas('root', store.getState(), store);

      const loop = (timestamp) => {
        store.dispatch(tick(timestamp));
        //updateObjects(canvasObjects, store.getState());

        requestAnimationFrame(loop);
      };

      //requestAnimationFrame(loop);

      document.querySelector('body').addEventListener('touchstart', () => {
        store.dispatch(jump());
      })
    });
  }
};

app.init();
