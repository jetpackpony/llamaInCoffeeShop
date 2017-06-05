import { JUMP_MIN_HEIGHT, TUTORIAL_STATES } from '../constants';

const isPlayerNearTheGround = (world) => {
  const playerPositionY = world.player.body.position.y;
  const groundHeight = world.groundHeight;
  const playerHeight = world.player.height;
  return Math.abs(playerPositionY - groundHeight) < playerHeight * JUMP_MIN_HEIGHT;
};

export default (state, action) => {
  if (state.world.gameState !== 'playing'){
    return state;
  }

  if (!isPlayerNearTheGround(state.world)) {
    return state;
  }

  if (state.world.player.animation.id === 'colliding') {
    return state;
  }

  let tutorial = state.world.tutorial;
  if (tutorial === TUTORIAL_STATES.OBSTACLE_PAUSED) {
    tutorial = TUTORIAL_STATES.OBSTACLE_RUNNING;
  }

  return {
    ...state,
    world: {
      ...state.world,
      tutorial,
      player: {
        ...state.world.player,
        animation: {
          id: 'jumping',
          startedAt: state.world.timestamp,
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
