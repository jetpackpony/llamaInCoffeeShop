import R from 'ramda';

export default (world) => {
  return {
    ...world,
    newSounds: [
      ...world.newSounds,
      ...((world.player.animation.id === 'colliding')
        ? []
        : R.uniq(world.newCollisions.map(obj => `collision.${obj.type}`))
      )
    ]
  };
};
