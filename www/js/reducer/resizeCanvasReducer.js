export default function resizeCanvasReducer(state, action) {
  const canvasW = action.payload.width;
  const canvasH = action.payload.height;
  const scale = canvasH / state.world.height;
  const width = Math.ceil(canvasW / scale);

  return {
    ...state,
    assets: {
      ...state.assets,
      sceneWidth: canvasW,
      sceneHeight: canvasH,
      scale,
      dpr: action.payload.dpr
    },
    world: {
      ...state.world,
      width
    }
  };
};
