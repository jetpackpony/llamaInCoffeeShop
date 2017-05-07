import { JUMP_MIN_HEIGHT } from '../constants';

const isPlayerNearTheGround = (world) => {
  const playerPositionY = world.player.body.position.y;
  const groundHeight = world.groundHeight;
  const playerHeight = world.player.height;
  return Math.abs(playerPositionY - groundHeight) < playerHeight * JUMP_MIN_HEIGHT;
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
        currentAnimation: 'jumping',
        currentFrame: 0,
        body: {
          ...state.world.player.body,
          velocity: state.world.jumpVelocity
        }
      }
    }
  };
};
