import getInitialState from '../store/initialState';

export default (state, action) => {
  const initialState = getInitialState();
  return {
    ...initialState,
    assets: state.assets,
    world: {
      ...initialState.world,
      width: state.world.width,
      player: state.world.player,
      ground: state.world.ground,
      obstacleTypes: state.world.obstacleTypes,
      collectableTypes: state.world.collectableTypes
    }
  };
};
