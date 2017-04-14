import updateFrame from './updateFrame';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducer';
import { tick, ActionTypes, setDimensions } from './actions';

const middlewares = [];
const logger = createLogger({
  predicate: (getState, action) => action.type !== ActionTypes.TICK
});
middlewares.push(logger);

const createGame = function createGame(canvasEl) {
  let rafId = null;
  const canvas = canvasEl;
  //const store = { initPos: 100, pos: 0 };
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  );

  const loop = function loop(timestamp) {
    updateFrame(canvasEl, store, timestamp);
    rafId = requestAnimationFrame(loop);
  };

  return {
    store,
    canvas,

    start: function start() {
      rafId = requestAnimationFrame(loop);
    },

    stop: function stop() {
      cancelAnimationFrame(rafId);
    }
  };
};

export default createGame;
