import { tick } from './actions';
import draw from './draw';

const updateFrame = function updateFrame(store, timestamp) {
  store.dispatch(tick(timestamp));
  draw(store.getState());
};

export default updateFrame;
