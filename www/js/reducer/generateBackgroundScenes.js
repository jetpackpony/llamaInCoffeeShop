import R from 'ramda';
import { randInRange } from '../utils';

const makeObject = (world) => {
  const last = R.last(world.background.scenes);
  const objectType = world.backgroundTypes[randInRange(0, world.backgroundTypes.length - 1)];
  let position = { x: 0, y : 0 };

  if (last) {
    position.x = last.body.position.x + last.objectType.width;
  }

  return {
    id: `${world.timestamp}`,
    objectType,
    body: {
      position,
      lastTick: world.timestamp
    }
  };
};

const shouldCreateScene = (world) => {
  const last = R.last(world.background.scenes);
  if (!last) {
    return true;
  }
  return (last.body.position.x + last.objectType.width - world.width) <= world.width;
};

export default function generateBackgroundScenes(world) {
  return {
    ...world,
    background: {
      ...world.background,
      scenes: [
        ...world.background.scenes,
        ...(shouldCreateScene(world) ? [makeObject(world)] : [])
      ]
    }
  };
};
