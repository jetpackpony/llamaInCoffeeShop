export default function tickGround(world, timestamp) {
  return {
    ...world,
    objects: world.objects.map((obj) => {
      // If this is the ground, clip the x position
      if (obj.id === 'ground') {
        obj.body.position.x = obj.body.position.x % world.ground.tileWidth;
      }
      return obj;
    })
  }
};
