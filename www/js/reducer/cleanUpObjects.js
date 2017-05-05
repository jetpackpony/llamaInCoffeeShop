export default function cleanUpObjects(world) {
  return {
    ...world,
    objects: world.objects.filter((obj) => (
      obj.body.position.x > 0 - obj.objectType.width
    ))
  };
};
