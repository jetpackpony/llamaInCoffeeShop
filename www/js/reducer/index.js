import jumpReducer from './jumpReducer';
import tickReducer from './tickReducer';
import setDimensions from './setDimensions';

import initialState from '../store/initialState';
import { ActionTypes } from '../actions';
const { JUMP, TICK, SET_DIMENSIONS } = ActionTypes;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIMENSIONS: return setDimensions(state, action);
    case JUMP: return jumpReducer(state, action);
    case TICK: return tickReducer(state, action);
    default: return state;
  }
};
