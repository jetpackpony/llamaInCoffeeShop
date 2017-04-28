export const ActionTypes = {
  JUMP: 'JUMP',
  TICK: 'TICK',
  RESIZE_CANVAS: 'RESIZE_CANVAS',
  RESTART_GAME: 'RESTART_GAME'
};

export function jump() {
  return { type: ActionTypes.JUMP };
}

export function tick(timestamp) {
  return { type: ActionTypes.TICK, payload: { timestamp } };
}

export function resizeCanvas(width, height, dpr) {
  return { type: ActionTypes.RESIZE_CANVAS, payload: { width, height, dpr } };
}

export function restartGame() {
  return { type: ActionTypes.RESTART_GAME };
}
