import R from 'ramda';

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import getInitialState from './initialState';

import reducer from '../reducer';
import { tick, ActionTypes } from '../actions';
import { COLLISION_BOX_OFFSET, OBSTACLE_WIDTH, BG_SCENE_HEIGHT } from '../constants';
import { getCollisionBounds } from '../physics';

const middlewares = [];
/*
const logger = createLogger({
  predicate: (getState, action) => action.type !== ActionTypes.TICK
});
middlewares.push(logger);
*/


const getHeight = (width, image) => image.height * (width / image.width);

const initPlayer = (initial, image) => {
  const playerHeight = getHeight(initial.width, image);
  return {
    ...initial,
    height: playerHeight,
    collisionBounds: getCollisionBounds(
      initial.width, playerHeight, COLLISION_BOX_OFFSET
    )
  };
};

const generateTypes = (images) => (
  images.map((img) => ({
    height: OBSTACLE_WIDTH,
    width: img.width * (OBSTACLE_WIDTH / img.height),
    image: img
  }))
);

const generateBGTypes = (images) => (
  images.map((img) => ({
    height: BG_SCENE_HEIGHT,
    width: img.width * (BG_SCENE_HEIGHT / img.height),
    image: img
  }))
);

const initGround = (ground, image) => {
  return {
    ...ground,
    tileHeight: image.height,
    tileWidth: image.width
  };
};

const generateAnimations = (images) => {
  return {
    running: {
      id: 'running',
      type: 'automated',
      speed: 0.5,
      frames: Object.values(R.pick(R.times((i) => (`llama0${i + 1}.png`), 6), images))
    },
    jumping: {
      id: 'jumping',
      type: 'manual',
      frames: Object.values(R.pick(R.times((i) => (`llama-jump0${i + 1}.png`), 6), images)),
      duration: 200
    },
    colliding: {
      id: 'colliding',
      type: 'manual',
      frames: Object.values(R.pick(R.times((i) => (`llama-collision0${i + 1}.png`), 6), images)),
      duration: 1000
    },
    fallingAsleep: {
      id: 'fallingAsleep',
      type: 'manual',
      frames: Object.values(R.pick(R.times((i) => (`llama-falling-asleep0${i + 1}.png`), 6), images)),
      duration: 1000
    }
  };
};

export default function initStore({ images }) {
  const initialState = getInitialState();
  const initValue = {
    ...initialState,
    assets: {
      ...initialState.assets,
      images
    },
    world: {
      ...initialState.world,
      player: initPlayer(initialState.world.player, images["llama01.png"]),
      ground: initGround(initialState.world.ground, images['floorTile.png']),
      collectableTypes: generateTypes([
        images["collectable01.png"],
        images["collectable02.png"],
        images["collectable03.png"]
      ]),
      obstacleTypes: generateTypes([
        images["obstacle01.png"], images["obstacle02.png"],
        images["obstacle03.png"], images["obstacle04.png"],
        images["obstacle05.png"], images["obstacle06.png"]
      ]),
      backgroundTypes: generateBGTypes([
        images['bg-scene-1.png'],
        images['bg-scene-2.png'],
        images['bg-scene-3.png']
      ]),
      playerAnimations: generateAnimations(images)
    }
  };
  return createStore(
    reducer,
    initValue,
    applyMiddleware(...middlewares)
  );
};
