import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import getInitialState from './initialState';

import reducer from '../reducer';
import { tick, ActionTypes } from '../actions';
import { COLLISION_BOX_OFFSET } from '../constants';
import { getCollisionBounds } from '../physics';

const middlewares = [];
/*
const logger = createLogger({
  predicate: (getState, action) => action.type !== ActionTypes.TICK
});
middlewares.push(logger);
*/


const getHeight = (width, image) => image.height * (width / image.width);

export default function initStore({ images }) {
  const initialState = getInitialState();
  const playerHeight = getHeight(initialState.world.player.width, images["llama01.png"]);
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
        height: playerHeight,
        collisionBounds: getCollisionBounds(initialState.world.player.width, playerHeight, COLLISION_BOX_OFFSET)
      },
      obstacle: {
        ...initialState.world.obstacle,
        height: getHeight(initialState.world.obstacle.width, images["obstacle01.png"])
      },
      collectable: {
        ...initialState.world.collectable,
        height: getHeight(initialState.world.collectable.width, images["collectable01.png"])
      }
    }
  };
  return createStore(
    reducer,
    initValue,
    applyMiddleware(...middlewares)
  );
};
