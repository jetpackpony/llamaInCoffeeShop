import getInitialState from '../store/initialState';

export default (state, action) => {
  const initialState = getInitialState();
  return {
    ...initialState,
    assets: state.assets,
    world: {
      ...initialState.world,
      playerAnimations: state.world.playerAnimations,
      width: state.world.width,
      player: {
        ...state.world.player,
        animation: {
          id: 'running',
          startedAt: 0,
          currentFrame: 0
        }
      },
      ground: {
        ...state.world.ground,
        body: initialState.world.ground.body
      },
      obstacleTypes: state.world.obstacleTypes,
      collectableTypes: state.world.collectableTypes,
      backgroundTypes: state.world.backgroundTypes
    }
  };
};
