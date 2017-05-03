import * as PIXI from 'pixi.js';

export function createScore(state) {
  return new PIXI.Text(
    `${state.world.score.steps} m`,
    {fontSize: 20, fill: "black"}
  );
};
