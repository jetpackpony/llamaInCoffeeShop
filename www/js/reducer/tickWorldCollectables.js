const generateObj = (timestamp, worldWidth, worldSpeed, groundHeight) => {
  return {
    id: `collectable-${timestamp}`,
    generated: timestamp,
    type: 'collectable',
    view: 'coffee',
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
    .filter((el) => el.type === 'collectable')
    .map((el) => el.body.position.x || 0)
    .sort((a, b) => a - b)
    .pop() || 0;

  const xSinceLastObject = world.width - lastObjectX;
  if (xSinceLastObject >= getRandomArbitrary(world.minSpread, world.maxSpread)) {
    return [ generateObj(timestamp, world.width, world.worldSpeed, world.groundHeight) ];
  }

  return [];
};

export default (world, timestamp) => {
  return {
    ...world,
    objects: [
      ...world.objects,
      ...generateObjects(world, timestamp)
    ]
  };
};

