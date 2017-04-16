import clear from './clear';
import drawFPS from './drawFPS';
import drawGround from './drawGround';
import drawPlayer from './drawPlayer';

export default function draw(state) {
  const canvas = state.assets.canvas;
  clear(canvas);
  drawFPS(canvas, state);
  drawGround(canvas, state);
  drawPlayer(canvas, state);
};
