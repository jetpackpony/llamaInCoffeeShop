import unpackCanvas from './unpackCanvas';

export default function drawObstacles(canvas, state) {
  const { ctx } = unpackCanvas(canvas);
  const img = state.assets.images.obstacle.imgObject;
  const scale = state.assets.scale;
  const obstacleWidth = state.world.obstacle.obstacleWidth * scale;
  const obstacleHeight = img.height * (obstacleWidth / img.width);

  const bodies = state.world.objects
    .filter((el) => el.type === 'obstacle')
    .map((el) => el.body)
    .forEach((body) => {
      const x = body.position.x * scale;
      const y = (state.world.height - body.position.y) * scale;

      ctx.save();

      ctx.translate(x, y - obstacleHeight);
      ctx.drawImage(img, 0, 0, obstacleWidth, obstacleHeight);

      ctx.restore();
    });
}
