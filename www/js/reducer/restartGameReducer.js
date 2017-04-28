import initialState from '../store/initialState';

export default (state, action) => {
  return {
    ...initialState,
    assets: state.assets,
    world: {
      ...state.world,
      score: initialState.world.score,
      gameState: initialState.world.gameState,
      objects: initialState.world.objects
    }
  };
};
