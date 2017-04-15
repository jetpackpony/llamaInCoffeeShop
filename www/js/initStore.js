import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducer';
import { tick, ActionTypes, setDimensions } from './actions';

const middlewares = [];
const logger = createLogger({
  predicate: (getState, action) => action.type !== ActionTypes.TICK
});
middlewares.push(logger);

export default function initStore() {
  return createStore(
    reducer,
    applyMiddleware(...middlewares)
  );
};
