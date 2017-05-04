import R from 'ramda';
import { Vector, Polygon, testPolygonPolygon } from 'sat';

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

const makePolygon = ({ x, y, collisionBounds }) => {
  return new Polygon(
    new Vector(x, y),
    collisionBounds.map((point) => new Vector(point.x, point.y))
  );
};

export const getCollisions = (player, objects) => {
  const playerBox = makePolygon(player);
  return objects
    .filter((obj) => testPolygonPolygon(
        playerBox,
        makePolygon(obj)
      )
    )
    .map((obj) => obj.id);
};

export const getCollisionBounds = (width, height, boxOffset) => ([
  {x: boxOffset, y: boxOffset},
  {x: width - boxOffset, y: boxOffset},
  {x: width - boxOffset, y: height - boxOffset},
  {x: boxOffset, y: height - boxOffset}
]);
