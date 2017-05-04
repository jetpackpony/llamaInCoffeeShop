import { resizeCanvas, restartGame, tick, jump } from './actions';
import initGame from './initGame';

import createStage from './canvasObjects';

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

      let stage = createStage(document.getElementById('root'), width, height, dpr, store.getState().assets.scale);

      // Game loop
      const loop = (timestamp) => {
        frameCount++;
        if (timestamp - lastCount > 500) {
          fps = frameCount * 2;
          frameCount = 0;
          lastCount = timestamp;
        }

        store.dispatch(tick(timestamp));
        stage.update(store.getState(), fps);

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);

      // Add listener for restart game
      stage.canvas.addEventListener('touchstart', (e) => {
        const { clientX, clientY } = e.touches[0];
        if (clientX > width - 50 && clientY < 50) {
          e.stopPropagation();
          store.dispatch(restartGame());
        }
      });

      // Add event listener for jump
      stage.canvas.addEventListener('touchstart', () => {
        store.dispatch(jump());
      })
    });
  }
};

app.init();
