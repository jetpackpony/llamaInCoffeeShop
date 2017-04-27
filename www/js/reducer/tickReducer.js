import tickMetrics from './tickMetrics';
import tickWorld from './tickWorld';
import tickGround from './tickGround';
import tickWorldObjects from './tickWorldObjects';
import tickWorldCollectables from './tickWorldCollectables';
import {
  calculateCollisions,
  updateScore, updateCollisions
} from './collisions';

export default function tickReducer(state, action) {
  let gameState = state.gameState;
  if (gameState === 'loosing') {
    return state;
  }

  const timestamp = action.payload.timestamp;
  let newWorld = tickWorld(state.world, timestamp);

  newWorld = tickGround(newWorld, timestamp);
  newWorld = tickWorldObjects(newWorld, timestamp);
  //newWorld = tickWorldCollectables(newWorld, timestamp);
  const collisions = calculateCollisions(newWorld);
  const score = updateScore(collisions, state.score, state.collectableBonus, state.obstacleDamage);
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
