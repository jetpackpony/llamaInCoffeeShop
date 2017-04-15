export default function unpackCanvas(canvas) {
  return {
    width: canvas.width,
    height: canvas.height,
    ctx: canvas.getContext('2d')
  };
};
