import unpackCanvas from './unpackCanvas';
const addLine = function addLine(ctx, offset, text, title) {
  ctx.translate(0, offset);
  ctx.fillText(`${title}: ${text}`, 0, 0);
};

export default function drawFPS(canvas, state) {
  const metrics = state.metrics;
  const { width, height, ctx, cssWidth, cssHeight } = unpackCanvas(canvas);
  const dpr = state.assets.dpr;
  const scale = state.assets.scale;
  const fontSize = Math.min(height, width) * 0.05;
  const lineHeight = fontSize * 1.1;

  ctx.save();

  ctx.fillStyle = 'black';
  ctx.font = `${fontSize}px Arial`;
  ctx.translate(10, 0);

  addLine(ctx, lineHeight, metrics.frameRate, 'fps');
  addLine(ctx, lineHeight, width, 'width');
  addLine(ctx, lineHeight, height, 'height');
  addLine(ctx, lineHeight, cssWidth, 'css width');
  addLine(ctx, lineHeight, cssHeight, 'css height');
  addLine(ctx, lineHeight, dpr, 'dpr');
  addLine(ctx, lineHeight, scale, 'scale');

  ctx.restore();
};
