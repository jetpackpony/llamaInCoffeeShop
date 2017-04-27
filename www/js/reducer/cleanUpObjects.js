export default function cleanUpObjects(world) {
  const maxWidth = Math.max(world.obstacle.width, world.collectable.width);
  return {
    ...world,
    objects: world.objects.filter((obj) => (
      obj.body.position.x > 0 - maxWidth
    ))
  };
};
