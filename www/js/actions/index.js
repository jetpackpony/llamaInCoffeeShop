export const ActionTypes = {
  JUMP: 'JUMP',
  TICK: 'TICK',
  SET_DIMENSIONS: 'SET_DIMENSIONS',
  RESIZE_CANVAS: 'RESIZE_CANVAS'
};

export function jump() {
  return { type: ActionTypes.JUMP };
}

export function tick(timestamp) {
  return { type: ActionTypes.TICK, payload: { timestamp } };
}

export function setDimensions(width, height) {
  return { type: ActionTypes.SET_DIMENSIONS, payload: { width, height } };
}

export function resizeCanvas(scale) {
  return { type: ActionTypes.RESIZE_CANVAS, payload: { scale } };
}
