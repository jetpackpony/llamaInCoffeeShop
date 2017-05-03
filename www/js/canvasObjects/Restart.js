import * as PIXI from 'pixi.js';

export function createRestart(state, store) {
  let text = new PIXI.Text(
    "⟲",
    {fontSize: 50, fill: "black"}
  );
  text.anchor.x = 1;
  text.x = state.world.width;
  return text;
};

