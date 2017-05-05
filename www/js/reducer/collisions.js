import { curry } from 'ramda';
import { getCollisions } from '../physics';

export const calculateCollisions = (world) => {
  const objects = world
    .objects
    .filter((obj) => !obj.colliding);

  const playerBounds = {
    x: world.player.body.position.x,
    y: world.player.body.position.y,
    collisionBounds: world.player.collisionBounds
  };
  const objectsBounds = objects.map((obj) => ({
    id: obj.id,
    x: obj.body.position.x,
    y: obj.body.position.y,
    collisionBounds: obj.collisionBounds
  }));
  const collisionIds = getCollisions(playerBounds, objectsBounds);

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
