const cleanUpObjects = (objs, objWidth) => {
  return objs.filter((obj) => {
    return (obj.type !== 'obstacle' && obj.type !== 'collectable') || obj.body.position.x > 0 - objWidth;
  });
};

const generateObj = (timestamp, worldWidth, worldSpeed, groundHeight, spread) => {
  return {
    id: `obstacle-${timestamp}`,
    generated: timestamp,
    type: 'obstacle',
    view: 'table',
    spread,
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
  const lastObject = world.objects
    .filter((el) => el.type === 'obstacle')
    .sort((a, b) => a.body.position.x - b.body.position.x)
    .pop();
  if (!lastObject) {
    return [ generateObj(timestamp, world.width, world.worldSpeed, world.groundHeight, getRandomArbitrary(world.minSpread, world.maxSpread)) ];
  }

  const xSinceLastObject = world.width - lastObject.body.position.x;
  if (xSinceLastObject >= lastObject.spread) {
    return [ generateObj(timestamp, world.width, world.worldSpeed, world.groundHeight, getRandomArbitrary(world.minSpread, world.maxSpread)) ];
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

