import R from 'ramda';
import { clipValue } from  '../utils';
import { calcVelocity, calcPosition, updateBody } from '../physics';
import {
  MIN_GROUND_SPEED, MAX_GROUND_SPEED, GROUND_TILE_WIDTH
} from '../constants';

const clipXPosition = (oldPos) => (
  oldPos % GROUND_TILE_WIDTH
);
const clipXVelocity = (oldVel) => (
  clipValue(MIN_GROUND_SPEED, MAX_GROUND_SPEED, Math.abs(oldVel)) * -1
);
const calcXAcceleration = R.curry((energy, oldAcc) => (
  (energy > 90) ? -50 : 50
));

export default (world) => {
  const timeDiff = (world.timestamp - world.ground.body.lastTick) / 1000;
  return R.evolve({
    ground: {
      body: R.compose(
        R.evolve({
          position: { x: clipXPosition },
          velocity: { x: clipXVelocity },
          acceleration: { x: calcXAcceleration(world.score.energy) },
          prevPositionX: () => world.ground.body.position.x,
          lastTick: () => world.timestamp
        }),
        updateBody(timeDiff)
      )
    }
  }, world);
};
