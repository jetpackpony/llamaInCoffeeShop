import { compose, curry } from 'ramda';
import * as Utils from  '../utils';
import { calcVelocity, calcPosition, updateBody } from '../physics';
import {
  MIN_GROUND_SPEED, MAX_GROUND_SPEED, GROUND_TILE_WIDTH
} from '../constants';

const clipValue = Utils.clipValue(MIN_GROUND_SPEED, MAX_GROUND_SPEED);

const modifyPosition = curry((tileWidth, body) => {
  return {
    ...body,
    position: {
      ...body.position,
      x: body.position.x % tileWidth
    }
  };
});

const modifyVelocity = curry((tileWidth, body) => {
  return {
    ...body,
    velocity: {
      ...body.velocity,
      x: clipValue(Math.abs(body.velocity.x)) * -1
    }
  };
});

const modifyAcceleration = curry((energy, body) => {
  return {
    ...body,
    acceleration: {
      ...body.acceleration,
      x: (energy > 90) ? -50 : 50
    }
  };
});

const modifyXDiff = curry((tileWidth, prevX, body) => {
  const groundPosition = Math.abs(prevX);
  const newGroundPosition = Math.abs(body.position.x);
  let xDiffSinceLastTick = newGroundPosition - groundPosition;

  if (xDiffSinceLastTick <= 0) {
    xDiffSinceLastTick = tileWidth - xDiffSinceLastTick;
  }
  return {
    ...body,
    xDiffSinceLastTick
  }
});

export default (world) => {
  const updateGroundBody = compose(
    modifyXDiff(GROUND_TILE_WIDTH, world.ground.body.position.x),
    modifyAcceleration(world.score.energy),
    modifyVelocity(GROUND_TILE_WIDTH),
    modifyPosition(GROUND_TILE_WIDTH),
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
