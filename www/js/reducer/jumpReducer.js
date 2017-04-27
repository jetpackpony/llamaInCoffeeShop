const isPlayerNearTheGround = (world) => {
  const playerPositionY = world.player.body.position.y;
  const groundHeight = world.groundHeight;
  const playerHeight = world.player.height;
  return Math.abs(playerPositionY - groundHeight) < playerHeight * 0.1;
};

export default (state, action) => {
  if (!isPlayerNearTheGround(state.world)) {
    return state;
  }

  return {
    ...state,
    world: {
      ...state.world,
      player: {
        ...state.world.player,
        body: {
          ...state.world.player.body,
          velocity: state.world.jumpVelocity
        }
      }
    }
  };
};
