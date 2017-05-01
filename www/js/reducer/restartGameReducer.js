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
      obstacle: state.world.obstacle,
      collectable: state.world.collectable
    }
  };
};
