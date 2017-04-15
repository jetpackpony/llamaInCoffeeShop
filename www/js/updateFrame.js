import { tick } from './actions';
import draw from './draw';

const updateFrame = function updateFrame(canvas, store, timestamp) {
  store.dispatch(tick(timestamp));
  draw(canvas, store.getState());
};

export default updateFrame;
