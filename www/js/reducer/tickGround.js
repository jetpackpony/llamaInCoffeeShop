import { calcVelocity, calcPosition, updateBody } from '../physics';
import { MIN_GROUND_SPEED, MAX_GROUND_SPEED } from '../constants';

export default (world) => {
  const timeDiff = (world.timestamp - world.ground.body.lastTick) / 1000;
  const newBody = updateBody(world.ground.body, timeDiff);
  newBody.position.x = newBody.position.x % world.ground.tileWidth;

  // Clip speed between min/max
  if (newBody.velocity.x > MIN_GROUND_SPEED) {
    newBody.velocity.x = MIN_GROUND_SPEED;
  }
  if (newBody.velocity.x < MAX_GROUND_SPEED) {
    newBody.velocity.x = MAX_GROUND_SPEED;
  }

  // Calculate the diff that the ground moved
  const groundPosition = Math.abs(world.ground.body.position.x);
  const newGroundPosition = Math.abs(newBody.position.x);
  let xDiffSinceLastTick = newGroundPosition - groundPosition;

  if (xDiffSinceLastTick <= 0) {
    xDiffSinceLastTick = world.ground.tileWidth - xDiffSinceLastTick;
  }

  // Calculate the acceleration
  if (world.score.energy > 90) {
    newBody.acceleration.x = -50;
  } else {
    newBody.acceleration.x = 50;
  }

  return {
    ...world,
    ground: {
      ...world.ground,
      body: {
        ...newBody,
        lastTick: world.timestamp
      },
      xDiffSinceLastTick
    }
  };
};
