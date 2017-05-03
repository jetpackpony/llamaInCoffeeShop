import * as PIXI from 'pixi.js';
import { restartGame } from './actions';
import { getPlayerData, createPlayer } from './Player';
import { getGroundData, createGround } from './Ground';
import { createScore } from './Score';
import { createEnergyBar } from './EnergyBar';
import { createRestart } from './Restart';
import { updateWorldObjects } from './WorldObjects';

export function setupCanvas(rootId, state, store) {
  const renderer = PIXI.autoDetectRenderer(1, 1);
  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.autoResize = true;
  renderer.resize(state.assets.sceneWidth, state.assets.sceneHeight);
  renderer.backgroundColor = 0xFFFFFF;
  document.getElementById(rootId).appendChild(renderer.view);

  // Add listener for restart game
  renderer.view.addEventListener('touchstart', (e) => {
    const { clientX, clientY } = e.touches[0];
    if (clientX > renderer.width - 50 && clientY < 50) {
      e.stopPropagation();
      store.dispatch(restartGame());
    }
  });

  const stage = new PIXI.Container();
  stage.scale.x = state.assets.scale;
  stage.scale.y = state.assets.scale;

  let player = createPlayer(state);
  let ground = createGround(state);
  let score = createScore(state);
  let energyBar = createEnergyBar(state);
  let restart = createRestart(state, store);
  let worldObjects = new PIXI.Container();
  let fpsCount = new PIXI.Text(
    `0 fps`,
    {fontSize: 20, fill: "black"}
  );
  fpsCount.y = 30;

  stage.addChild(
    ground, worldObjects,
    player, score, fpsCount,
    energyBar, restart
  );
  renderer.render(stage);

  return {
    renderer, stage,
    ground, worldObjects,
    player, score, fpsCount,
    energyBar, restart
  };
};

export function updateObjects(objects, state, fps) {
  let playerData = getPlayerData(state);
  objects.player.position.set(playerData.x, playerData.y);
  let groundData = getGroundData(state);
  objects.ground.position.set(groundData.x, groundData.y);
  objects.score.text = `${state.world.score.steps} m`;

  objects
    .energyBar
    .children
    .find((o) => o.id === 'bar')
    .width = state.world.score.energy / 100 * 200;

  updateWorldObjects(objects, state);

  objects.fpsCount.text = `${fps} fps`;

  objects.renderer.render(objects.stage);
};
