const updateVelocity = function updateVelocity(obj, velocity) {
  return {
    ...obj,
    body: {
      ...obj.body,
      velocity
    }
  };
};

const playerIsOnTheGround = function playerIsOnTheGround(state) {
  const playerPositionY = state.world.objects.find((obj) => obj.id === 'player').body.position.y;
  const groundHeight = state.world.groundHeight;
  return playerPositionY <= groundHeight;
};

export default (state, action) => {
  // If the player is on the ground, don't allow another touch
  if (!playerIsOnTheGround(state)) {
    return state;
  }
  const jumpVelocity = state.world.jumpVelocity;

  return {
    ...state,
    world: {
      ...state.world,
      objects: state.world.objects.map((obj) => {
        if (obj.id === 'player') {
          return updateVelocity(obj, jumpVelocity);
        } else {
          return obj;
        }
      })
    }
  };
};
