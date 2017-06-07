import { compose, curry } from 'ramda';

import tickObjects from './tickObjects';
import tickGround from './tickGround';
import tickPlayer from './tickPlayer';
import tickBackground from './tickBackground';
import generateObstacles from './generateObstacles';
import generateCollectables from './generateCollectables';
import generateBackgroundScenes from './generateBackgroundScenes';
import cleanUpObjects from './cleanUpObjects';
import cleanUpBackgroundScenes from './cleanUpBackgroundScenes';
import {
  calculateCollisions,
  updateCollisionObjects
} from './collisions';
import * as ScoreUpdators from './score';
import { COLLECTABLE_BONUS, OBSTACLE_DAMAGE } from '../constants';
import createSounds from './createSounds';

const updateScore =
  ScoreUpdators.updateScore(COLLECTABLE_BONUS, OBSTACLE_DAMAGE);
const updateGameState = ScoreUpdators.updateGameState;


const tickFPS = (fps, timestamp) => {
  if (timestamp - fps.lastTick > 500) {
    return {
      count: 0,
      lastTick: timestamp,
      frameRate: fps.count * 2
    };
  }
  return {
    ...fps,
    count: fps.count + 1
  };
};

export default function tickReducer(state, action) {
  return {
    ...state,
    fps: tickFPS(state.fps, action.payload.timestamp),
    world: {
      ...compose(
        updateGameState,
        updateScore,
        updateCollisionObjects,
        createSounds,
        calculateCollisions,
        cleanUpBackgroundScenes,
        cleanUpObjects,
        generateBackgroundScenes,
        generateCollectables,
        generateObstacles,
        tickBackground,
        tickObjects,
        tickGround,
        tickPlayer
      )({
        ...state.world,
        newSounds: [],
        timestamp: action.payload.timestamp
      })
    }
  };
};
