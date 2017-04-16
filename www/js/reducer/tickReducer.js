import tickMetrics from './tickMetrics';
import tickWorld from './tickWorld';
import tickGround from './tickGround';
import tickObstacles from './tickObstacles';

export default function tickReducer(state, action) {
  const timestamp = action.payload.timestamp;
  let newWorld = tickWorld(state.world, timestamp);

  newWorld = tickGround(newWorld, timestamp);
  newWorld = tickObstacles(newWorld, timestamp);

  return {
    ...state,
    metrics: tickMetrics(state.metrics, timestamp),
    world: newWorld
  };
};
