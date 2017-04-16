const calcVelocity = (v, a, t) => {
  return {
    x: v.x + a.x * t,
    y: v.y + a.y * t
  };
};

const calcPosition = (position, velocity, t) => {
  const dX = Math.ceil(velocity.x * t);
  const dY = Math.ceil(velocity.y * t);

  return {
    x: position.x + dX,
    y: position.y + dY
  };
};

const updateBody = function updateBody(body, timeDiff) {
  // If haven't updated before, don't calculate anything
  if (body.lastTick === 0) {
    return body;
  }

  const velocity = calcVelocity(body.velocity, body.acceleration, timeDiff);
  const position = calcPosition(body.position, velocity, timeDiff);

  return {
    ...body,
    velocity: velocity,
    position: position
  };
};

export default function tickWorld(world, timestamp) {
  const objects = world.objects.map((obj) => {
    const body = obj.body;
    const timeDiff = (timestamp - body.lastTick) / 1000;
    const newBody = updateBody(body, timeDiff);

    // If dropped below the ground, clip it
    if (newBody.position.y < world.groundHeight) {
      newBody.position.y = world.groundHeight;
    }

    return {
      ...obj,
      body: {
        ...body,
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
