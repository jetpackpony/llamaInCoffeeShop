import { updateDisplayObject } from '../physics';
import { GRAVITY, GROUND_Y, WORLD_SPEED } from '../constants';

const cleanUpObstacles = (objs) => {
  return objs.filter((obj) => obj.displayObject.coords.x > 0 - obstacleWidth);
};

const obstacleWidth = 50;

const generateObj = (timestamp, sceneWidth) => {
  return {
    id: `${timestamp}`,
    generated: timestamp,
    displayObject: {
      acceleration: { x: 0, y: 0 },
      velocity: { x: WORLD_SPEED, y: 0 },
      coords: { x: sceneWidth + 1, y: GROUND_Y },
      lastTick: 0
    }
  };
};

const generateObstacles = (objs, sceneWidth, timestamp) => {
  const lastObjectTime = objs
    .map((el) => el.generated)
    .sort((a, b) => a - b)
    .pop();

  if (timestamp - lastObjectTime > 1000) {
    return [ generateObj(timestamp, sceneWidth) ];
  }
  return [];
};

export default (obstacles, scene, timestamp) => {
  return [
    ...cleanUpObstacles(obstacles),
    ...generateObstacles(obstacles, scene.width, timestamp)
  ].map((obj) => ({
    ...obj,
    displayObject: updateDisplayObject(obj.displayObject, timestamp)
  }));
};

