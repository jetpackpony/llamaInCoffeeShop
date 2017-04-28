import { curry } from 'ramda';
import { getCollisions } from '../physics';

const offset = 10;

export const calculateCollisions = (world) => {
  const objects = world
    .objects
    .filter((obj) => !obj.colliding);

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

  return {
    ...world,
    newCollisions: objects.filter((obj) => collisionIds.includes(obj.id))
  }
};

export const updateCollisionObjects = curry((world) => {
  const collidingIds = world.newCollisions.map((obj) => obj.id);
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
