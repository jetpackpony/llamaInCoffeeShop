import { randInRange } from '../utils';
import { MIN_GROUND_SPEED } from '../constants';

const obstaclePatterns = [
  [0, 6],
  [0],
  [0, 1],
  [0, 2, 3],
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
  return pattern.map((x) => ({
    id: `obstacle-${world.timestamp + x}`,
    type: 'obstacle',
    view: 'table',
    spread,
    body: {
      position: {
        x: world.width + (x * world.obstacle.width * speedMultiplier),
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

