import unpackCanvas from './unpackCanvas';

export default function drawPlayer(canvas, state) {
  const { width, height, ctx } = unpackCanvas(canvas);
  const { x, y } = state.player.displayObject.coords;
  const img = state.statics.images.player.imgObject;
  const coeff = (height * 0.2) / img.height;
  const newH = img.height * coeff;
  const newW = img.width * coeff;

  ctx.save();

  ctx.translate(x, height - y);
  ctx.drawImage(img, 0, 0, newW, newH);

  ctx.restore();
}
