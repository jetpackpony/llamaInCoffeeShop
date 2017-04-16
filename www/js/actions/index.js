export const ActionTypes = {
  JUMP: 'JUMP',
  TICK: 'TICK',
  RESIZE_CANVAS: 'RESIZE_CANVAS'
};

export function jump() {
  return { type: ActionTypes.JUMP };
}

export function tick(timestamp) {
  return { type: ActionTypes.TICK, payload: { timestamp } };
}

export function resizeCanvas(dpr) {
  return { type: ActionTypes.RESIZE_CANVAS, payload: { dpr } };
}
