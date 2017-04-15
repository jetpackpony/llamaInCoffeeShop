import unpackCanvas from './unpackCanvas';

export default function drawGround(canvas, state) {
  const { width, height, ctx } = unpackCanvas(canvas);
  const tileWidth = state.ground.tileWidth;
  const tileHeight = 50;

  ctx.save();

  ctx.translate(state.ground.position, height - tileHeight);

  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(0, 0, width + tileWidth, 50);

  ctx.restore();
};
