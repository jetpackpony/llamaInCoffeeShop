import * as PIXI from 'pixi.js';

export default function createOrUpdateScore(score, state) {
  let text = state.world.score.steps;
  return updateScore(score || createScore(text), text);
};

function createScore(text) {
  return new PIXI.Text(
    `${text} m`,
    {fontSize: 20, fill: "black"}
  );
}

function updateScore(score, text) {
  score.text = `${text} m`;
  return score;
}
