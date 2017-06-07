import R from 'ramda';

export default (world) => {
  return {
    ...world,
    newSounds: [
      ...world.newSounds,
      ...R.uniq(world.newCollisions.map(obj => `collision.${obj.type}`))
    ]
  };
};
