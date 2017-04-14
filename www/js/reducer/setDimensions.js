export default (state, action) => {
  return {
    ...state,
    scene: {
      width: action.payload.width,
      height: action.payload.height
    }
  };
};
