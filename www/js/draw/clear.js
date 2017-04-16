import unpackCanvas from './unpackCanvas';

export default function clear(canvas) {
  const { width, height, ctx } = unpackCanvas(canvas);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#9e9ee8';
  ctx.fillRect(0, 0, width, height);
};
