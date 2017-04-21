import tickMetrics from './tickMetrics';
import tickWorld from './tickWorld';
import tickGround from './tickGround';
import tickObstacles from './tickObstacles';
import tickCollectables from './tickCollectables';

export default function tickReducer(state, action) {
  const timestamp = action.payload.timestamp;
  let newWorld = tickWorld(state.world, timestamp);

  newWorld = tickGround(newWorld, timestamp);
  newWorld = tickObstacles(newWorld, timestamp);
  newWorld = tickCollectables(newWorld, timestamp);

  return {
    ...state,
    metrics: tickMetrics(state.metrics, timestamp),
    world: newWorld
  };
};
