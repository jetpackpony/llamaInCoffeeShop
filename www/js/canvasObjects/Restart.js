import * as PIXI from 'pixi.js';

export default function createOrUpdateRestart(restart, state) {
  return updateRestart(restart || createRestart(state), state);
};

function createRestart(state) {
  let text = new PIXI.Text(
    "⟲",
    {fontSize: 50, fill: "black"}
  );
  text.anchor.x = 1;
  text.x = state.world.width;
  return text;
}

function updateRestart(restart, state) {
  return restart;
}
