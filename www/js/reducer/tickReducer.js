import tickMetrics from './tickMetrics';
import tickWorld from './tickWorld';

export default function tickReducer(state, action) {
  const timestamp = action.payload.timestamp;
  return {
    ...state,
    metrics: tickMetrics(state.metrics, timestamp),
    world: tickWorld(state.world, timestamp),
  };
};
