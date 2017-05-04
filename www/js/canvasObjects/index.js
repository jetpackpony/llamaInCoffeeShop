import * as PIXI from 'pixi.js';
import createOrUpdatePlayer from './Player';
import createOrUpdateGround from './Ground';
import createOrUpdateWorldObjects from './WorldObjects';
import createOrUpdateScore from './Score';
import createOrUpdateEnergyBar from './EnergyBar';
import createOrUpdateRestart from './Restart';
import createOrUpdateFPSCounter from './FPSCounter';

export default function createStage(root, width, height, dpr, scale) {
  let renderer = PIXI.autoDetectRenderer(width, height, {
    autoResize: true,
    resolution: dpr
  });
  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.backgroundColor = 0xFFFFFF;
  root.appendChild(renderer.view);

  let stage = new PIXI.Container();
  stage.scale.x = scale;
  stage.scale.y = scale;

  let objects = {};

  renderer.render(stage);

  function update(state, fps) {
    objects = updateObjects(objects, state, fps);
    stage.addChild(...Object.values(objects));
    renderer.render(stage);
  }

  function updateObjects(objects, state, fps) {
    return {
      ground: createOrUpdateGround(objects.ground, state),
      worldObjects: createOrUpdateWorldObjects(objects.worldObjects, state),
      player: createOrUpdatePlayer(objects.player, state),
      score: createOrUpdateScore(objects.score, state),
      energyBar: createOrUpdateEnergyBar(objects.energyBar, state),
      restart: createOrUpdateRestart(objects.restart, state),
      fpsCounter: createOrUpdateFPSCounter(objects.fpsCounter, fps)
    };
  }

  return {
    update,
    canvas: renderer.view,
    width: renderer.width,
    height: renderer.height
  };
};
