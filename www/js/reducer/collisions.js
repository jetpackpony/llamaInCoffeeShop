import { Vector, Box, testPolygonPolygon } from 'sat';

export const calculateCollisions = (world) => {
  const offset = 10;
  const player = world.objects.find((obj) => obj.id === 'player');
  const collidables = world
    .objects
    .filter((obj) => obj.type === 'obstacle' || obj.type === 'collectable')
    .filter((obj) => !obj.collidingWithPlayer);

  const playerBox = new Box(
    new Vector(player.body.position.x + offset, player.body.position.y + offset),
    world.player.width - offset*2,
    world.player.height - offset*2
  ).toPolygon();

  return collidables.filter((obj) => {
    const objBox = new Box(
      new Vector(obj.body.position.x + offset, obj.body.position.y + offset),
      world.obstacle.width - offset*2,
      world.obstacle.height - offset*2,
    ).toPolygon();
    return testPolygonPolygon(playerBox, objBox);
  });
};

export const updateScore = (collisions, oldScore) => {
  const newScore = collisions.reduce((score, collision) => {
    if (collision.view === 'coffee') {
      score.coffees++;
      score.energy += 20;
    }
    if (collision.view === 'table') {
      score.tables++;
      score.energy -= 20;
    }
    return score;
  }, { ...oldScore });
  if (newScore.energy > 100) newScore.energy = 100;
  if (newScore.energy < 0) newScore.energy = 0;

  return {
    ...oldScore,
    ...newScore
  };
};

export const updateCollisions = (world, collisions) => {
  const collidingIds = collisions.map((obj) => obj.id);
  const objects = world.objects.map((obj) => {
    const collidingWithPlayer = obj.collidingWithPlayer || collidingIds.includes(obj.id);
    if (collidingWithPlayer && obj.type === 'collectable') return null;
    return {
      ...obj,
      collidingWithPlayer
    };
  }).filter((obj) => obj !== null);

  return {
    ...world,
    objects
  };
};
