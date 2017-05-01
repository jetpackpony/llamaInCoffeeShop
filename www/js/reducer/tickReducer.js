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

export default function tickReducer(state, action) {
  if (state.world.gameState === 'loosing') {
    return state;
  }

  return {
    ...state,
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
