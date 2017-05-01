import R from 'ramda';
import { Vector, Box, testPolygonPolygon } from 'sat';

export const calcVelocity = (v, a, t) => {
  return {
    x: v.x + a.x * t,
    y: v.y + a.y * t
  };
};

export const calcPosition = (position, velocity, t) => {
  const dX = Math.ceil(velocity.x * t);
  const dY = Math.ceil(velocity.y * t);

  return {
    x: position.x + dX,
    y: position.y + dY
  };
};

export const updateBody = R.curry(function updateBody(timeDiff, body) {
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
});

const makeBox = (x, y, w, h, offset) => {
  return new Box(
    new Vector(
      x + offset,
      y + offset
    ),
    w - offset * 2,
    h - offset * 2
  ).toPolygon();
};

export const getCollisions = (player, objects, boxOffset) => {
  const playerBox = makeBox(player.x, player.y, player.w, player.h, boxOffset);
  return objects
    .filter((obj) => testPolygonPolygon(
        playerBox,
        makeBox(obj.x, obj.y, obj.w, obj.h, boxOffset)
      )
    )
    .map((obj) => obj.id);
};
