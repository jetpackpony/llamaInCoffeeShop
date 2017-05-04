import * as PIXI from 'pixi.js';

export default function createOrUpdateFPSCounter(fpsCounter, fps) {
  return updateFPSCounter(fpsCounter || createFPSCounter(fps), fps);
};

function createFPSCounter(fps) {
  let text = new PIXI.Text(
    `${fps} fps`,
    {fontSize: 20, fill: "black"}
  );
  text.y = 30;
  return text;
}

function updateFPSCounter(fpsCounter, fps) {
  fpsCounter.text = `${fps} fps`;
  return fpsCounter;
}
