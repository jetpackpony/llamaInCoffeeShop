import jumpReducer from './jumpReducer';
import tickReducer from './tickReducer';
import resizeCanvasReducer from './resizeCanvasReducer';
import restartGameReducer from './restartGameReducer';

import getInitialState from '../store/initialState';
import { ActionTypes } from '../actions';
const {
  JUMP, TICK, RESIZE_CANVAS,
  RESTART_GAME
} = ActionTypes;

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case JUMP: return jumpReducer(state, action);
    case TICK: return tickReducer(state, action);
    case RESIZE_CANVAS: return resizeCanvasReducer(state, action);
    case RESTART_GAME: return restartGameReducer(state, action);
    default: return state;
  }
};
