import clear from './clear';
import drawFPS from './drawFPS';
import drawGround from './drawGround';
import drawPlayer from './drawPlayer';
import drawObstacles from './drawObstacles';

export default function draw(state) {
  const canvas = state.assets.canvas;
  clear(canvas);
  drawFPS(canvas, state);
  drawGround(canvas, state);
  drawObstacles(canvas, state);
  drawPlayer(canvas, state);
};
