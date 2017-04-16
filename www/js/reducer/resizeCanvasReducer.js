import { WORLD_HEIGHT } from '../constants';

export default function resizeCanvasReducer(state, action) {
  const canvasW = state.assets.canvas.width;
  const canvasH = state.assets.canvas.height;
  const scale = canvasH / WORLD_HEIGHT;
  const width = Math.ceil(canvasW / scale);

  return {
    ...state,
    assets: {
      ...state.assets,
      scale,
      dpr: action.payload.dpr
    },
    world: {
      ...state.world,
      width
    }
  };
};
