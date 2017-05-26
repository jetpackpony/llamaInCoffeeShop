export default function cleanUpObjects(world) {
  return {
    ...world,
    background: {
      scenes: world.background.scenes.filter((obj) => (
        obj.body.position.x > 0 - obj.objectType.width
      ))
    }
  };
};
