import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import initialState from './initialState';

import reducer from '../reducer';
import { tick, ActionTypes, setDimensions } from '../actions';

const middlewares = [];
const logger = createLogger({
  predicate: (getState, action) => action.type !== ActionTypes.TICK
});
middlewares.push(logger);

export default function initStore({ canvas, images }) {
  const initValue = {
    ...initialState,
    statics: {
      canvas
    }
  };
  return createStore(
    reducer,
    initValue,
    applyMiddleware(...middlewares)
  );
};
