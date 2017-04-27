import { calcVelocity, calcPosition, updateBody } from '../physics';
import { MIN_GROUND_SPEED, MAX_GROUND_SPEED } from '../constants';

export default (world) => {
  const timeDiff = (world.timestamp - world.ground.body.lastTick) / 1000;
  const newBody = updateBody(world.ground.body, timeDiff);
  newBody.position.x = newBody.position.x % world.ground.tileWidth;

  if (newBody.velocity.x > MIN_GROUND_SPEED) {
    newBody.velocity.x = MIN_GROUND_SPEED;
  }

  if (newBody.velocity.x < MAX_GROUND_SPEED) {
    newBody.velocity.x = MAX_GROUND_SPEED;
  }

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
