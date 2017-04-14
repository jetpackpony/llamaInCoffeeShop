export default (ground, timestamp) => {
  if (ground.lastTick === 0) {
    return {
      ...ground,
      lastTick: timestamp
    };
  }

  const timeDiff = (timestamp - ground.lastTick) / 1000;
  const dX = ground.velocity.x * timeDiff;

  if (Math.abs(dX) < 1) {
    return ground;
  }

  return {
    ...ground,
    position: (ground.position + dX) % ground.tileWidth,
    lastTick: timestamp
  };
};
