import { compose, curry } from 'ramda';

import tickObjects from './tickObjects';
import tickGround from './tickGround';
import tickPlayer from './tickPlayer';
import generateObstacles from './generateObstacles';
import generateCollectables from './generateCollectables';
import cleanUpObjects from './cleanUpObjects';
import {
  calculateCollisions,
  updateCollisionObjects
} from './collisions';
import * as ScoreUpdators from './score';
import { COLLECTABLE_BONUS, OBSTACLE_DAMAGE } from '../constants';

const updateScore =
  ScoreUpdators.updateScore(COLLECTABLE_BONUS, OBSTACLE_DAMAGE);
const updateGameState = ScoreUpdators.updateGameState;


const tickFPS = (fps, timestamp) => {
  if (timestamp - fps.lastTick > 500) {
    return {
      count: 0,
      lastTick: timestamp,
      frameRate: fps.count * 2
    };
  }
  return {
    ...fps,
    count: fps.count + 1
  };
};

export default function tickReducer(state, action) {
  if (state.world.gameState === 'loosing') {
    return state;
  }

  return {
    ...state,
    fps: tickFPS(state.fps, action.payload.timestamp),
    world: {
      ...compose(
        updateGameState,
        updateScore,
        updateCollisionObjects,
        calculateCollisions,
        cleanUpObjects,
        generateCollectables,
        generateObstacles,
        tickObjects,
        tickGround,
        tickPlayer
      )({
        ...state.world,
        timestamp: action.payload.timestamp
      })
    }
  };
};
