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
    if (collision.view === 'coffee') score.coffees++;
    if (collision.view === 'table') score.tables++;
    return score;
  }, { ...oldScore });

  return {
    ...oldScore,
    ...newScore
  };
};

export const updateCollisions = (world, collisions) => {
  const collidingIds = collisions.map((obj) => obj.id);
  const objects = world.objects.map((obj) => {
    return {
      ...obj,
      collidingWithPlayer: obj.collidingWithPlayer || collidingIds.includes(obj.id)
    };
  });

  return {
    ...world,
    objects
  };
};
