import R from 'ramda';
import * as Utils from  '../utils';
import { calcVelocity, calcPosition, updateBody } from '../physics';
import {
  MIN_GROUND_SPEED, MAX_GROUND_SPEED, GROUND_TILE_WIDTH
} from '../constants';

const clipValue = Utils.clipValue(MIN_GROUND_SPEED, MAX_GROUND_SPEED);
const clipXVelocity = (oldVel) => clipValue(Math.abs(oldVel)) * -1;
const clipXPosition = (oldPos) => oldPos % GROUND_TILE_WIDTH;
const calcXAcceleration = R.curry((energy, oldAcc) => (
  (energy > 90) ? -50 : 50
));
const calcXDiff = R.curry((oldPos, newPos, oldDiff) => {
  const xDiff = Math.abs(newPos) - Math.abs(oldPos);
  return (xDiff <= 0) ? GROUND_TILE_WIDTH - xDiff : xDiff;
});

const xPosLens = R.lensPath(['position', 'x']);
const xVelLens = R.lensPath(['velocity', 'x']);
const xAccLens = R.lensPath(['acceleration', 'x']);
const xDiffLens = R.lensProp('xDiffSinceLastTick');

const modifyProperty = R.curry((lens, updater, body) => {
  return R.set(lens, updater(R.view(lens, body)), body);
});

const modifyXDiff = R.curry((prevX, body) => (
  modifyProperty(xDiffLens, calcXDiff(prevX, body.position.x), body)
));

export default (world) => {
  const updateGroundBody = R.compose(
    modifyXDiff(world.ground.body.position.x),
    modifyProperty(xAccLens, calcXAcceleration(world.score.energy)),
    modifyProperty(xVelLens, clipXVelocity),
    modifyProperty(xPosLens, clipXPosition),
    updateBody
  );
  const timeDiff = (world.timestamp - world.ground.body.lastTick) / 1000;

  return {
    ...world,
    ground: {
      ...world.ground,
      body: {
        ...updateGroundBody(world.ground.body, timeDiff),
        lastTick: world.timestamp
      }
    }
  };
};
