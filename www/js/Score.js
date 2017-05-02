import Konva from 'konva';

export function createScore(state) {
  return new Konva.Text({
    x: 10,
    y: 10,
    text: `${state.world.score.steps} m`,
    fontSize: "20"
  });
};
