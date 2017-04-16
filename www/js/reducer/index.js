import jumpReducer from './jumpReducer';
import tickReducer from './tickReducer';
import resizeCanvasReducer from './resizeCanvasReducer';

import initialState from '../store/initialState';
import { ActionTypes } from '../actions';
const { JUMP, TICK, RESIZE_CANVAS } = ActionTypes;

export default (state = initialState, action) => {
  switch (action.type) {
    case JUMP: return jumpReducer(state, action);
    case TICK: return tickReducer(state, action);
    case RESIZE_CANVAS: return resizeCanvasReducer(state, action);
    default: return state;
  }
};