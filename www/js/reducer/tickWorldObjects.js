const cleanUpObjects = (objs, objWidth) => {
  return objs.filter((obj) => {
    return (obj.type !== 'obstacle' && obj.type !== 'collectable') || obj.body.position.x > 0 - objWidth;
  });
};

const generateObj = (timestamp, x, y, worldSpeed, spread) => {
  return {
    id: `obstacle-${timestamp + x}`,
    generated: timestamp,
    type: 'obstacle',
    view: 'table',
    spread,
    body: {
      acceleration: { x: 0, y: 0 },
      velocity: { x: worldSpeed, y: 0 },
      position: { x, y },
      lastTick: timestamp
    }
  };
};

const generatePattern = (timestamp, worldWidth, worldSpeed, groundHeight, spread, width) => {
  const patterns = [
    [0, 5],
    [0],
    [0, 1],
    [0, 3, 4],
  ];

  const randId = Math.floor(Math.random() * patterns.length);
  const pattern = patterns[randId];

  return pattern.map((x) => {
    return generateObj(timestamp, worldWidth + x * width, groundHeight, worldSpeed, spread);
  });
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
    return generatePattern(timestamp, world.width, world.worldSpeed, world.groundHeight, getRandomArbitrary(world.minSpread, world.maxSpread), world.obstacle.width);
  }

  const xSinceLastObject = world.width - lastObject.body.position.x;
  if (xSinceLastObject >= lastObject.spread) {
    return generatePattern(timestamp, world.width, world.worldSpeed, world.groundHeight, getRandomArbitrary(world.minSpread, world.maxSpread), world.obstacle.width);
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

