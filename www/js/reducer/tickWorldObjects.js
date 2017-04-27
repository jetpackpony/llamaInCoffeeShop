const cleanUpObjects = (objs, objWidth) => {
  return objs.filter((obj) => {
    return (obj.type !== 'obstacle' && obj.type !== 'collectable') || obj.body.position.x > 0 - objWidth;
  });
};

const generateObj = (timestamp, worldWidth, worldSpeed, groundHeight, obstacleProbability) => {
  let obstacle = false;
  if (Math.random() >= obstacleProbability) obstacle = true;
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

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateObjects = (world, timestamp) => {
  const lastObjectX = world.objects
    .filter((el) => el.type === 'obstacle' || el.type === 'collectable')
    .map((el) => el.body.position.x || 0)
    .sort((a, b) => a - b)
    .pop() || 0;

  const xSinceLastObject = world.width - lastObjectX;
  if (xSinceLastObject >= getRandomArbitrary(world.minSpread, world.maxSpread)) {
    return [ generateObj(timestamp, world.width, world.worldSpeed, world.groundHeight, world.obstacleProbability) ];
  }

  return [];
};

export default (world, timestamp) => {
  return {
    ...world,
    objects: cleanUpObjects([
      ...world.objects,
      ...generateObjects(world, timestamp)
    ], world.obstacle.width)
  };
};

