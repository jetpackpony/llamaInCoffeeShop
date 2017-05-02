import Konva from 'konva';
import { restartGame } from './actions';

export function createRestart(state, store) {
  let restart = new Konva.Text({
    x: state.world.width - 100,
    y: "10",
    fontSize: "70",
    text: "⟲",
    fill: "black"
  });
  restart.on('touchstart', () => store.dispatch(restartGame()));
  return restart;
};

