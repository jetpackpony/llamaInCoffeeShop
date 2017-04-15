import unpackCanvas from './unpackCanvas';

export default function drawGround(canvas, state) {
  const { width, height, ctx } = unpackCanvas(canvas);
  const tileWidth = state.ground.tileWidth;
  const tileHeight = state.statics.groundHeight;
  const tileImg = state.statics.images.groundTile.imgObject;
  const x = state.ground.position;
  const y = height - tileHeight; // inverse vert coordinates

  ctx.save();

  ctx.translate(x, y);

  ctx.fillStyle = ctx.createPattern(tileImg, 'repeat');
  ctx.fillRect(0, 0, width + tileWidth, tileHeight);

  ctx.restore();
};
