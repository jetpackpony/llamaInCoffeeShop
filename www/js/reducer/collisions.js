import { Vector, Box, testPolygonPolygon } from 'sat';

export const calculateCollisions = (world) => {
  const player = world.objects.find((obj) => obj.id === 'player');
  const collidables = world
    .objects
    .filter((obj) => obj.type === 'obstacle' || obj.type === 'collectable')
    .filter((obj) => !obj.collidingWithPlayer);

  const playerBox = new Box(
    new Vector(player.body.position.x, player.body.position.y),
    world.player.width,
    world.player.height
  ).toPolygon();

  return collidables.filter((obj) => {
    const objBox = new Box(
      new Vector(obj.body.position.x, obj.body.position.y),
      world.obstacle.obstacleWidth,
      world.obstacle.obstacleHeight,
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
