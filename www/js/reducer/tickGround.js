import R from 'ramda';
import { clipValue } from  '../utils';
import { calcVelocity, calcPosition, updateBody } from '../physics';
import {
  MIN_GROUND_SPEED, MAX_GROUND_SPEED, GROUND_TILE_WIDTH
} from '../constants';

const clipXPosition = (oldPos) => oldPos % GROUND_TILE_WIDTH;
const clipXVelocity = (oldVel) => (
  clipValue(MIN_GROUND_SPEED, MAX_GROUND_SPEED, Math.abs(oldVel)) * -1
);
const calcXAcceleration = R.curry((energy, oldAcc) => (
  (energy > 90) ? -50 : 50
));
const calcXDiff = R.curry((oldPos, newPos) => {
  const xDiff = Math.abs(newPos) - Math.abs(oldPos);
  return (xDiff <= 0) ? GROUND_TILE_WIDTH - xDiff : xDiff;
});

const modifyXDiff = R.curry((prevX, body) => (
  R.set(R.lensProp('xDiffSinceLastTick'), calcXDiff(prevX, body.position.x), body)
));

export default (world) => {
  const body = world.ground.body;
  const transformations = {
    position: { x: clipXPosition },
    velocity: { x: clipXVelocity },
    acceleration: { x: calcXAcceleration(world.score.energy) },
    lastTick: () => world.timestamp
  };
  const updateGroundBody = R.compose(
    modifyXDiff(body.position.x),
    R.evolve(transformations),
    updateBody
  );
  const timeDiff = (world.timestamp - body.lastTick) / 1000;

  return {
    ...world,
    ground: {
      ...world.ground,
      body: {
        ...updateGroundBody(body, timeDiff),
      }
    }
  };
};
