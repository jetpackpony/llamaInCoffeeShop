import { curry, last } from 'ramda';
import { randInRange } from '../utils';

const getLastObjectByType = (type, objects) => (last(objects
  .filter((el) => el.type === type)
  .sort((a, b) => a.body.position.x - b.body.position.x))
);

const getLastObstacle = curry(getLastObjectByType)('obstacle');
const getLastCollectable = curry(getLastObjectByType)('collectable');

const shouldGenerateCollectable = (world) => {
  const lastObstacle = getLastObstacle(world.objects);
  if (!lastObstacle) {
    return false;
  }
  const xSinceLastObstacle = world.width - lastObstacle.body.position.x;
  if (xSinceLastObstacle < world.obstacle.width || xSinceLastObstacle > (lastObstacle.spread - world.obstacle.width)) {
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

const makeObject = (world, spread) => {
  return {
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
  };
};

export default function generateCollectables(world) {
  const spread = randInRange(world.minSpread / 2, world.maxSpread / 2);
  return {
    ...world,
    objects: [
      ...world.objects,
      ...(shouldGenerateCollectable(world))
        ? [ makeObject(world, spread) ]
        : []
    ]
  };
};

