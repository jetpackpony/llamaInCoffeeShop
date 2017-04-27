import { calcVelocity, calcPosition, updateBody } from '../physics';

export default (world) => {
  const timeDiff = (world.timestamp - world.ground.body.lastTick) / 1000;
  const newBody = updateBody(world.ground.body, timeDiff);
  newBody.position.x = newBody.position.x % world.ground.tileWidth;

  return {
    ...world,
    ground: {
      ...world.ground,
      body: {
        ...world.ground.body,
        ...newBody,
        lastTick: world.timestamp
      }
    }
  };
};
