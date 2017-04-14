export default (state, action) => {
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
