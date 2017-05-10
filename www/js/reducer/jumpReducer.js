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
        animation: {
          start: state.world.timestamp,
          duration: 200,
          totalFrames: 6,
          currentFrame: 0
        },
        body: {
          ...state.world.player.body,
          velocity: state.world.jumpVelocity
        }
      }
    }
  };
};
