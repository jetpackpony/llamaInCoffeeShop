import { compose, curry } from 'ramda';
import { getCollisions } from '../physics';

const offset = 10;

export const getCollidingObjects = (world) => {
  const objects = world
    .objects
    .filter((obj) => !obj.colliding)

  const playerBounds = {
    x: world.player.body.position.x,
    y: world.player.body.position.y,
    w: world.player.width,
    h: world.player.height
  };
  const objectsBounds = objects.map((obj) => ({
    id: obj.id,
    x: obj.body.position.x,
    y: obj.body.position.y,
    w: world.obstacle.width,
    h: world.obstacle.height
  }));

  const collisionIds = getCollisions(playerBounds, objectsBounds, offset);

  return objects.filter((obj) => collisionIds.includes(obj.id));
};

export const updateScore = curry((
  collectableBonus, obstacleDamage,
  collisions, oldScore
) => {
  const newScore = collisions.reduce((score, collision) => {
    if (collision.type === 'collectable') {
      score.coffees++;
      score.energy += collectableBonus;
    }
    if (collision.type === 'obstacle') {
      score.tables++;
      score.energy += obstacleDamage;
    }
    return score;
  }, { ...oldScore });

  if (newScore.energy > 100) newScore.energy = 100;
  if (newScore.energy < 0) newScore.energy = 0;

  return {
    ...oldScore,
    ...newScore
  };
});

export const updateCollisions = curry((collisions, world) => {
  const collidingIds = collisions.map((obj) => obj.id);
  return {
    ...world,
    objects: world.objects
      .map((obj) => ({
        ...obj,
        colliding: obj.colliding || collidingIds.includes(obj.id)
      }))
      .filter((obj) => (
        !(obj.colliding && obj.type === 'collectable')
      ))
  };
});
