import { curry, last } from 'ramda';
import { randInRange } from '../utils';

const getLastObjectByType = (type, objects) => (last(objects
  .filter((el) => el.type === type)
  .sort((a, b) => a.body.position.x - b.body.position.x))
);

const getLastObstacle = curry(getLastObjectByType)('obstacle');
const getLastCollectable = curry(getLastObjectByType)('collectable');

const makeObject = (spread, world) => ({
  id: `collectable-${world.timestamp}`,
  type: 'collectable',
  view: 'coffee',
  spread,
  body: {
    position: {
      x: world.width,
      y: world.groundHeight
    },
    lastTick: world.timestamp
  }
});

const shouldGenerateCollectable = (world) => {
  const lastObstacle = getLastObstacle(world.objects);
  if (!lastObstacle) {
    return false;
  }
  const xSinceLastObstacle = world.width - lastObstacle.body.position.x;
  const isTooEarly = () => {
    return xSinceLastObstacle <= world.collectable.width * 3;
  };
  const isTooLate = () => {
    return xSinceLastObstacle >= lastObstacle.spread - world.collectable.width * 3;
  };
  if (isTooEarly() || isTooLate()) {
    return false;
  }

  const lastCollectable = getLastCollectable(world.objects);
  if (!lastCollectable) {
    return true;
  }
  const xSinceLastCollectable = world.width - lastCollectable.body.position.x;
  if (xSinceLastCollectable >= lastCollectable.spread) {
    return true;
  }
  return false;
};

export default function generateCollectables(world) {
  const spread = randInRange(world.minCollectableSpread, world.maxCollectableSpread);
  return {
    ...world,
    objects: [
      ...world.objects,
      ...(shouldGenerateCollectable(world))
        ? [ makeObject(spread, world) ]
        : []
    ]
  };
};
