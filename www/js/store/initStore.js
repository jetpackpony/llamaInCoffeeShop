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


const getHeight = (width, image) => image.height * (width / image.width);

export default function initStore({ images }) {
  const initValue = {
    ...initialState,
    assets: {
      ...initialState.assets,
      images
    },
    world: {
      ...initialState.world,
      player: {
        ...initialState.world.player,
        height: getHeight(initialState.world.player.width, images.player.imgObject)
      },
      obstacle: {
        ...initialState.world.obstacle,
        height: getHeight(initialState.world.obstacle.width, images.table.imgObject)
      },
      collectable: {
        ...initialState.world.collectable,
        height: getHeight(initialState.world.collectable.width, images.coffee.imgObject)
      }
    }
  };
  return createStore(
    reducer,
    initValue,
    applyMiddleware(...middlewares)
  );
};
