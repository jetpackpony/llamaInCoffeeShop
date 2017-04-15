import unpackCanvas from './unpackCanvas';

export default function drawFPS(canvas, metrics) {
  const { width, height, ctx } = unpackCanvas(canvas);
  const dpr = window.devicePixelRatio;
  const fontSize = Math.min(height, width) * 0.05;
  const lineHeight = fontSize * 1.1;

  ctx.fillStyle = 'black';
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(`fps: ${metrics.frameRate}`, 10, lineHeight);
  ctx.fillText(`width: ${width}`, 10, lineHeight * 2);
  ctx.fillText(`height: ${height}`, 10, lineHeight * 3);
  ctx.fillText(`dpr: ${dpr}`, 10, lineHeight * 4);
};
