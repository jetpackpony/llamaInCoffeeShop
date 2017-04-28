import { compose, curry } from 'ramda';

import tickObjects from './tickObjects';
import tickGround from './tickGround';
import tickPlayer from './tickPlayer';
import generateObstacles from './generateObstacles';
import generateCollectables from './generateCollectables';
import cleanUpObjects from './cleanUpObjects';
import * as Collisions from './collisions';
import { COLLECTABLE_BONUS, OBSTACLE_DAMAGE } from '../constants';

const updateScore = Collisions.updateScore(COLLECTABLE_BONUS, OBSTACLE_DAMAGE);
const { getCollidingObjects, updateCollisions } = Collisions;

export default function tickReducer(state, action) {
  let groundPosition = Math.abs(state.world.ground.body.position.x);
  let gameState = state.world.gameState;
  if (gameState === 'loosing') {
    return state;
  }

  const collisions = getCollidingObjects(state.world);
  const score = updateScore(collisions, state.world.score);

  let newWorld = compose(
    updateCollisions(collisions),
    cleanUpObjects,
    generateCollectables,
    generateObstacles,
    tickObjects,
    tickGround,
    tickPlayer
  )({
    ...state.world,
    timestamp: action.payload.timestamp
  });

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
    world: {
      ...newWorld,
      score,
      gameState
    }
  };
};
