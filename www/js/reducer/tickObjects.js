import { calcVelocity, calcPosition, updateBody } from '../physics';

export default function tickWorld(world) {
  const timestamp = world.timestamp;
  const objects = world.objects.map((obj) => {
    const timeDiff = (timestamp - obj.body.lastTick) / 1000;

    // Inherit acceleration and velocity from ground
    // and update the body
    const newBody = updateBody(timeDiff, {
      ...world.ground.body,
      position: obj.body.position,
      lastTick: obj.body.lastTick
    });

    return {
      ...obj,
      body: {
        ...obj.body,
        ...newBody,
        lastTick: timestamp
      }
    };
  });

  return {
    ...world,
    objects
  };
};
