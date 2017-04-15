import jumpReducer from './jumpReducer';
import tickReducer from './tickReducer';
import setDimensions from './setDimensions';

import { GRAVITY, GROUND_Y, WORLD_SPEED } from '../constants';
import { ActionTypes } from '../actions';
const { JUMP, TICK, SET_DIMENSIONS } = ActionTypes;

const initialState = {
  metrics: {
    frameRate: 0,
    frameCounter: 0,
    lastFrameRateTime: 0
  },
  scene: {
    width: 0,
    height: 0
  },
  player: {
    inJump: false,
    displayObject: {
      acceleration: { x: 0, y: GRAVITY },
      velocity: { x: 0, y: 0 },
      coords: { x: 30, y: 30 },
      lastTick: 0
    }
  },
  ground: {
    tileWidth: 100,
    position: 0,
    velocity: { x: WORLD_SPEED, y: 0 },
    lastTick: 0
  },
  obstacles: [
    {
      id: 'first',
      generated: 0,
      displayObject: {
        acceleration: { x: 0, y: GRAVITY },
        velocity: { x: WORLD_SPEED, y: 0 },
        coords: { x: 500, y: 100 },
        lastTick: 0
      }
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIMENSIONS: return setDimensions(state, action);
    case JUMP: return jumpReducer(state, action);
    case TICK: return tickReducer(state, action);
    default: return state;
  }
};
