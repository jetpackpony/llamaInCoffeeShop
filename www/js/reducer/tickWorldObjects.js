const cleanUpObjects = (objs, objWidth) => {
  return objs.filter((obj) => {
    return (obj.type !== 'obstacle' && obj.type !== 'collectable') || obj.body.position.x > 0 - objWidth;
  });
};

const generateObj = (timestamp, worldWidth, worldSpeed, groundHeight) => {
  let obstacle = true;
  if (Math.random() >= 0.5) obstacle = false;
  return {
    id: `${(obstacle) ? 'obstacle' : 'collectable'}-${timestamp}`,
    generated: timestamp,
    type: (obstacle) ? 'obstacle' : 'collectable',
    view: (obstacle) ? 'table' : 'coffee',
    body: {
      acceleration: { x: 0, y: 0 },
      velocity: { x: worldSpeed, y: 0 },
      position: { x: worldWidth + 1, y: groundHeight },
      lastTick: timestamp
    }
  };
};

const generateObjects = (world, timestamp) => {
  const lastObjectTime = world.objects
    .filter((el) => el.type === 'obstacle' || el.type === 'collectable')
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
    objects: cleanUpObjects([
      ...world.objects,
      ...generateObjects(world, timestamp)
    ], world.obstacle.obstacleWidth)
  };
};

