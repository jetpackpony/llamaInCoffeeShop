import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import initialState from './initialState';

import reducer from '../reducer';
import { tick, ActionTypes } from '../actions';

const middlewares = [];
const logger = createLogger({
  predicate: (getState, action) => action.type !== ActionTypes.TICK
});
middlewares.push(logger);

export default function initStore({ images }) {
  const initValue = {
    ...initialState,
    assets: {
      ...initialState.assets,
      images
    }
  };
  return createStore(
    reducer,
    initValue,
    applyMiddleware(...middlewares)
  );
};
