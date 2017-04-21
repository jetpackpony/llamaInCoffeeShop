const cleanUpCollectables = (objs, collectableWidth) => {
  return objs.filter((obj) => {
    return obj.type !== 'collectable' || obj.body.position.x > 0 - collectableWidth;
  });
};

const generateObj = (timestamp, worldWidth, worldSpeed, groundHeight) => {
  return {
    id: `collectable-${timestamp}`,
    generated: timestamp,
    type: 'collectable',
    body: {
      acceleration: { x: 0, y: 0 },
      velocity: { x: worldSpeed, y: 0 },
      position: { x: worldWidth + 1, y: groundHeight },
      lastTick: timestamp
    }
  };
};

const generateCollectables = (world, timestamp) => {
  const lastObjectTime = world.objects
    .filter((el) => el.type === 'collectable')
    .map((el) => el.generated || 0)
    .sort((a, b) => a - b)
    .pop() || 0;

  if (timestamp - lastObjectTime > 1300) {
    return [ generateObj(timestamp, world.width, world.worldSpeed, world.groundHeight) ];
  }
  return [];
};

export default (world, timestamp) => {
  return {
    ...world,
    objects: cleanUpCollectables([
      ...world.objects,
      ...generateCollectables(world, timestamp)
    ], world.collectable.collectableWidth)
  };
};

