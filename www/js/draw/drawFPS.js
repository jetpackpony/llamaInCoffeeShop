import unpackCanvas from './unpackCanvas';
const addLine = function addLine(ctx, offset, text, title) {
  ctx.translate(0, offset);
  ctx.fillText(`${title}: ${text}`, 0, 0);
};

export default function drawFPS(canvas, metrics) {
  const { width, height, ctx } = unpackCanvas(canvas);
  const dpr = window.devicePixelRatio;
  const fontSize = Math.min(height, width) * 0.05;
  const lineHeight = fontSize * 1.1;

  ctx.save();

  ctx.fillStyle = 'black';
  ctx.font = `${fontSize}px Arial`;
  ctx.translate(10, 0);

  addLine(ctx, lineHeight, metrics.frameRate, 'fps');
  addLine(ctx, lineHeight, width, 'width');
  addLine(ctx, lineHeight, height, 'height');
  addLine(ctx, lineHeight, dpr, 'dpr');

  ctx.restore();
};
