import unpackCanvas from './unpackCanvas';

export default function drawGround(canvas, state) {
  const { ctx } = unpackCanvas(canvas);
  const groundBody = state.world.objects.find((obj) => obj.id === 'ground').body;
  const worldWidth = state.world.width;
  const numTiles = Math.ceil(worldWidth / state.world.ground.tileWidth) + 1;
  const tileImg = state.assets.images.groundTile.imgObject;

  const scale = state.assets.scale;
  const tileWidth = state.world.ground.tileWidth * scale;
  const tileHeight = state.world.ground.tileHeight * scale;
  const x = groundBody.position.x * scale;
  const y = (state.world.height - groundBody.position.y) * scale;

  ctx.save();
  ctx.translate(x, y);
  for(let i = 0; i < numTiles; i++) {
    ctx.drawImage(tileImg, 0, 0, tileWidth, tileHeight);
    ctx.translate(tileWidth, 0);
  }
  ctx.restore();
};
