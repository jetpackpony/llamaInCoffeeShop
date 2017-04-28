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
  let groundPosition = Math.abs(state.world.ground.body.position.x);
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
  newWorld = updateCollisions(newWorld, collisions);

  const score = updateScore(collisions, state.score);

  if (score.energy <= 0) {
    gameState = 'loosing';
  }

  if (score.energy > 90) {
    newWorld.ground.body.acceleration.x = -50;
  } else {
    newWorld.ground.body.acceleration.x = 50;
  }
  let newGroundPosition = Math.abs(newWorld.ground.body.position.x);
  let diff = newGroundPosition - groundPosition;

  if (diff <= 0) {
    diff = newWorld.ground.tileWidth - diff;
  }
  score.steps = Math.round(score.steps + diff / newWorld.player.width / 3);

  return {
    ...state,
    gameState,
    score,
    metrics: tickMetrics(state.metrics, timestamp),
    world: newWorld
  };
};
