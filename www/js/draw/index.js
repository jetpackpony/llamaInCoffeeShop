import clear from './clear';
import drawFPS from './drawFPS';
import drawGround from './drawGround';

export default function draw(canvas, state) {
  clear(canvas);
  drawFPS(canvas, state.metrics);
  drawGround(canvas, state.ground);
};
