import clear from './clear';
import drawFPS from './drawFPS';
import drawGround from './drawGround';
import drawPlayer from './drawPlayer';

export default function draw(state) {
  const canvas = state.statics.canvas;
  clear(canvas);
  drawFPS(canvas, state.metrics);
  drawGround(canvas, state);
  drawPlayer(canvas, state);
};
