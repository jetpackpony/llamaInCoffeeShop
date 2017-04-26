import initialState from '../store/initialState';

export default (state, action) => {
  return {
    ...initialState,
    assets: state.assets,
    world: {
      ...state.world,
      objects: initialState.world.objects
    }
  };
};
