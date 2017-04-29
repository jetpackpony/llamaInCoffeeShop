import { curry } from 'ramda';
import { GROUND_TILE_WIDTH } from '../constants';

const calcXDiff = (oldPos, newPos) => {
  const xDiff = Math.abs(newPos) - Math.abs(oldPos);
  return (xDiff <= 0) ? GROUND_TILE_WIDTH - xDiff : xDiff;
};

export const updateScore = curry(( collectableBonus, obstacleDamage, world) => {
  const newScore = world.newCollisions.reduce((score, collision) => {
    if (collision.type === 'collectable') {
      score.coffees++;
      score.energy += collectableBonus;
    }
    if (collision.type === 'obstacle') {
      score.tables++;
      score.energy += obstacleDamage;
    }
    return score;
  }, { ...world.score });

  if (newScore.energy > 100) newScore.energy = 100;
  if (newScore.energy < 0) newScore.energy = 0;

  newScore.steps = Math.round(newScore.steps + calcXDiff(world.ground.body.prevPositionX, world.ground.body.position.x) / world.player.width / 3);

  return {
    ...world,
    score: {
      ...world.score,
      ...newScore
    }
  };
});

export const updateGameState = (world) => {
  return {
    ...world,
    gameState: (world.score.energy <= 0) ? 'loosing' : world.gameState
  }
};
