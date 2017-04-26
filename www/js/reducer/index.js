import jumpReducer from './jumpReducer';
import tickReducer from './tickReducer';
import resizeCanvasReducer from './resizeCanvasReducer';
import restartGameReducer from './restartGameReducer';

import initialState from '../store/initialState';
import { ActionTypes } from '../actions';
const {
  JUMP, TICK, RESIZE_CANVAS, PAUSE_GAME,
  RESTART_GAME
} = ActionTypes;

export default (state = initialState, action) => {
  switch (action.type) {
    case JUMP: return jumpReducer(state, action);
    case TICK: return tickReducer(state, action);
    case RESIZE_CANVAS: return resizeCanvasReducer(state, action);
    case PAUSE_GAME: return ({
      ...state,
      gameState: 'paused'
    });
    case RESTART_GAME: return restartGameReducer(state, action);
    default: return state;
  }
};
