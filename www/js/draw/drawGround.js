import unpackCanvas from './unpackCanvas';

export default function drawGround(canvas, state) {
  const { width, height, ctx } = unpackCanvas(canvas);

  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);
};
