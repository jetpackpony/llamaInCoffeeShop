import { resizeCanvas, tick, jump } from './actions';
import initGame from './initGame';

import { setupCanvas, updateObjects } from './canvasObjects';

let frameCount = 0,
  lastCount = 0,
  fps = 0;

const app = {
  init() {
    initGame().then((store) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      store.dispatch(resizeCanvas(width, height, dpr));

      let canvasObjects = setupCanvas('root', store.getState(), store);

      const loop = (timestamp) => {
        frameCount++;
        if (timestamp - lastCount > 500) {
          fps = frameCount * 2;
          frameCount = 0;
          lastCount = timestamp;
        }

        store.dispatch(tick(timestamp));
        updateObjects(canvasObjects, store.getState(), fps);

        requestAnimationFrame(loop);
      };

      requestAnimationFrame(loop);

      document.querySelector('body').addEventListener('touchstart', () => {
        store.dispatch(jump());
      })
    });
  }
};

app.init();
