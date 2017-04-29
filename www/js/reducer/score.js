import { curry } from 'ramda';

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

  newScore.steps = Math.round(newScore.steps + world.ground.body.xDiffSinceLastTick / world.player.width / 3);

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
