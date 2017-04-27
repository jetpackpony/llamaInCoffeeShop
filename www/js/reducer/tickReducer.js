import { compose, curry } from 'ramda';

import tickMetrics from './tickMetrics';
import tickObjects from './tickObjects';
import tickGround from './tickGround';
import tickPlayer from './tickPlayer';
import generateObstacles from './generateObstacles';
import generateCollectables from './generateCollectables';
import cleanUpObjects from './cleanUpObjects';
import * as Collisions from './collisions';
import { COLLECTABLE_BONUS, OBSTACLE_DAMAGE } from '../constants';

const calculateWorld = compose(
  cleanUpObjects,
  generateCollectables,
  generateObstacles,
  tickObjects,
  tickGround,
  tickPlayer
);

const updateScore = curry(Collisions.updateScore)(
  COLLECTABLE_BONUS,
  OBSTACLE_DAMAGE
);
const { getCollidingObjects, updateCollisions } = Collisions;

export default function tickReducer(state, action) {
  let gameState = state.gameState;
  if (gameState === 'loosing') {
    return state;
  }

  let timestamp = action.payload.timestamp;
  let newWorld = calculateWorld({
    ...state.world,
    timestamp
  });

  const collisions = getCollidingObjects(newWorld);
  const score = updateScore(collisions, state.score);
  newWorld = updateCollisions(newWorld, collisions);

  if (state.score.energy <= 0) {
    gameState = 'loosing';
  }

  return {
    ...state,
    gameState,
    score,
    metrics: tickMetrics(state.metrics, timestamp),
    world: newWorld
  };
};
