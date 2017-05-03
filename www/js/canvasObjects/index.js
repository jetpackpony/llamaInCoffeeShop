import * as PIXI from 'pixi.js';
import createOrUpdatePlayer from './Player';
import createOrUpdateGround from './Ground';
import createOrUpdateWorldObjects from './WorldObjects';
import createOrUpdateScore from './Score';
import createOrUpdateEnergyBar from './EnergyBar';
import createOrUpdateRestart from './Restart';

export default function createStage(root, width, height, scale) {
  let renderer = PIXI.autoDetectRenderer(1, 1);
  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.autoResize = true;
  renderer.resize(width, height);
  renderer.backgroundColor = 0xFFFFFF;
  root.appendChild(renderer.view);

  let stage = new PIXI.Container();
  stage.scale.x = scale;
  stage.scale.y = scale;

  let objects = {};

  renderer.render(stage);

  function update(state) {
    objects = updateObjects(objects, state);
    stage.addChild(...Object.values(objects));
    renderer.render(stage);
  }

  function updateObjects(objects, state) {
    return {
      ground: createOrUpdateGround(objects.ground, state),
      worldObjects: createOrUpdateWorldObjects(objects.worldObjects, state),
      player: createOrUpdatePlayer(objects.player, state),
      score: createOrUpdateScore(objects.score, state),
      energyBar: createOrUpdateEnergyBar(objects.energyBar, state),
      restart: createOrUpdateRestart(objects.restart, state)
    };
  }

  return {
    update,
    canvas: renderer.view,
    width: renderer.width,
    height: renderer.height
  };
};
