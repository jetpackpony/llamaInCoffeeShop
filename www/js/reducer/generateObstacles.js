import { randInRange } from '../utils';
import { MIN_GROUND_SPEED } from '../constants';
import { COLLISION_BOX_OFFSET } from '../constants';
import { getCollisionBounds } from '../physics';

const obstaclePatterns = [
  [0, 6, 7, 13],
  [0, 6, 7, 8, 14],
  [0, 1, 7, 8, 9, 15],
  [0, 6],
  [0, 6, 12],
  [0, 2],
  [0],
  [0, 1],
  [0, 1, 2],
];

const getLastObject = (world) => {
  return world.objects
    .filter((el) => el.type === 'obstacle')
    .sort((a, b) => a.body.position.x - b.body.position.x)
    .pop();
};

const shouldGenerateObjects = (worldWidth, lastObject) => {
  if (!lastObject) {
    return true;
  }
  const xSinceLastObject = worldWidth - lastObject.body.position.x;
  if (xSinceLastObject >= lastObject.spread) {
    return true;
  }
  return false;
};

const generatePattern = (world, pattern, spread) => {
  const speedMultiplier = Math.abs(world.ground.body.velocity.x / MIN_GROUND_SPEED);
  const obstacleType = world.obstacleTypes[0];
  return pattern.map((x) => ({
    id: `obstacle-${world.timestamp + x}`,
    type: 'obstacle',
    view: 'table',
    spread,
    collisionBounds: getCollisionBounds(
      obstacleType.width, obstacleType.height, COLLISION_BOX_OFFSET
    ),
    objectType: obstacleType,
    body: {
      position: {
        x: world.width + (x * obstacleType.width * speedMultiplier),
        y: world.groundHeight
      },
      lastTick: world.timestamp
    }
  }));
};

export default function generateObstacles(world) {
  return {
    ...world,
    objects: [
      ...world.objects,
      ...(shouldGenerateObjects(world.width, getLastObject(world)))
        ? generatePattern(
          world,
          obstaclePatterns[randInRange(0, obstaclePatterns.length)],
          randInRange(world.minSpread, world.maxSpread)
        )
        : []
    ]
  };
};

