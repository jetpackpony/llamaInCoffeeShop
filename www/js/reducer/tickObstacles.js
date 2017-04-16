const cleanUpObstacles = (objs, obstacleWidth) => {
  return objs.filter((obj) => {
    return obj.type !== 'obstacle' || obj.body.position.x > 0 - obstacleWidth;
  });
};

const generateObj = (timestamp, worldWidth, worldSpeed, groundHeight) => {
  return {
    id: `obstacle-${timestamp}`,
    generated: timestamp,
    type: 'obstacle',
    body: {
      acceleration: { x: 0, y: 0 },
      velocity: { x: worldSpeed, y: 0 },
      position: { x: worldWidth + 1, y: groundHeight },
      lastTick: timestamp
    }
  };
};

const generateObstacles = (world, timestamp) => {
  const lastObjectTime = world.objects
    .filter((el) => el.type === 'obstacle')
    .map((el) => el.generated || 0)
    .sort((a, b) => a - b)
    .pop() || 0;

  if (timestamp - lastObjectTime > 1000) {
    return [ generateObj(timestamp, world.width, world.worldSpeed, world.groundHeight) ];
  }
  return [];
};

export default (world, timestamp) => {
  return {
    ...world,
    objects: cleanUpObstacles([
      ...world.objects,
      ...generateObstacles(world, timestamp)
    ], world.obstacle.obstacleWidth)
  };
};

