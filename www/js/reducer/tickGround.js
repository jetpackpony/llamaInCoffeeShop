import R from 'ramda';
import { clipValue } from  '../utils';
import { calcVelocity, calcPosition, updateBody } from '../physics';
import {
  MIN_GROUND_SPEED, MAX_GROUND_SPEED,
  GROUND_ACCELERATION, GROUND_LOOSING_ACCELERATION,
  TUTORIAL_STATES
} from '../constants';

const clipXPosition = R.curry((tileWidth, oldPos) => (
  oldPos % tileWidth
));
const clipXVelocity = (oldVel) => (
  clipValue(0, MAX_GROUND_SPEED, Math.abs(oldVel)) * -1
);
const calcXAcceleration = R.curry((timeDiff, energy, oldAcc) => (
  Math.round(
    GROUND_ACCELERATION
    * (energy / 100)    // the more energy we have, the faster the acceleration
    * -1                // ground moves backwards
    *  timeDiff         // acceleration is per second
  )
));

export default (world) => {
  const timeDiff = clipValue(0.015, 0.5, (world.timestamp - world.ground.body.lastTick) / 1000);
  return R.evolve({
    ground: {
      body: R.compose(
        R.evolve({
          position: { x: clipXPosition(world.ground.tileWidth) },
          velocity: {
            x: (world.tutorial === TUTORIAL_STATES.OBSTACLE_PAUSED ? () => 0 : clipXVelocity)
          },
          acceleration: {
            x: ((world.gameState === 'loosing')
              ? () => GROUND_LOOSING_ACCELERATION
              : calcXAcceleration(timeDiff, world.score.energy))
          },
          prevPositionX: () => world.ground.body.position.x,
          lastTick: () => world.timestamp
        }),
        updateBody(timeDiff)
      )
    }
  }, world);
};
