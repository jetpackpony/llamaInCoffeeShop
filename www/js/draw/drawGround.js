import unpackCanvas from './unpackCanvas';

export default function drawGround(canvas, state) {
  const { width, height, ctx } = unpackCanvas(canvas);
  const tileWidth = state.ground.tileWidth;
  const tileHeight = 150;

  ctx.save();

  ctx.translate(state.ground.position, height - tileHeight);

  ctx.fillStyle = ctx.createPattern(state.statics.images.groundTile.imgObject, 'repeat');
  ctx.fillRect(0, 0, width + tileWidth, 150);

  ctx.restore();
};
