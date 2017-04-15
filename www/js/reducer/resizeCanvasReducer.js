import { GRAVITY, GROUND_Y, WORLD_SPEED } from '../constants';

export default function resizeCanvasReducer(state, action) {
  const scale = action.payload.scale;
  return {
    ...state,
    statics: {
      ...state.statics,
      scale,
      gravity: GRAVITY * scale,
      groundHeight: GROUND_Y * scale,
      worldSpeed: WORLD_SPEED * scale
    }
  };
};
