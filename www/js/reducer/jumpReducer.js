export default (state, action) => {
  // If the player is on the ground, don't allow another touch
  if (state.player.displayObject.coords.y > state.statics.groundHeight) {
    return state;
  }

  return {
    ...state,
    player: {
      ...state.player,
      displayObject: {
        ...state.player.displayObject,
        velocity: {
          ...state.player.displayObject.velocity,
          y: 1500
        }
      },
      inJump: true
    }
  };
};
