import unpackCanvas from './unpackCanvas';

export default function drawPlayer(canvas, state) {
  const { ctx } = unpackCanvas(canvas);
  const playerBody = state.world.objects.find((obj) => obj.id === 'player').body;
  const img = state.assets.images.player.imgObject;

  const scale = state.assets.scale;
  const x = playerBody.position.x * scale;
  const y = (state.world.height - playerBody.position.y) * scale;
  const playerHeight = state.world.player.height * scale;
  const playerWidth = img.width * (playerHeight / img.height);

  ctx.save();

  ctx.translate(x, y - playerHeight);
  ctx.drawImage(img, 0, 0, playerWidth, playerHeight);

  ctx.restore();
}
