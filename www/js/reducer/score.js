import { curry } from 'ramda';

const calcXDiff = (oldPos, newPos, tileWidth) => {
  const xDiff = Math.abs(newPos) - Math.abs(oldPos);
  return (xDiff <= 0) ? tileWidth - xDiff : xDiff;
};

export const updateScore = curry(( collectableBonus, obstacleDamage, world) => {
  const newScore = (world.player.animation.id === 'colliding')
    ? world.score
    : world.newCollisions.reduce((score, collision) => {
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

  newScore.steps = Math.round(newScore.steps + calcXDiff(world.ground.body.prevPositionX, world.ground.body.position.x, world.ground.tileWidth) / world.player.width / 3);

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
    gameState: newGameState(world)
  }
};

const newGameState = (world) => {
  if (world.gameState === 'playing') {
    return (world.score.energy <= 0) ? 'loosing' : 'playing';
  } else {
    return (world.ground.body.velocity.x >= -10) ? 'lost' : 'loosing';
  }
}
