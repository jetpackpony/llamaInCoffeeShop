import Konva from 'konva';
import { getPlayerData, createPlayer } from './Player';
import { getGroundData, createGround } from './Ground';
import { createScore } from './Score';
import { createEnergyBar } from './EnergyBar';
import { createRestart } from './Restart';
import { updateWorldObjects } from './WorldObjects';

export function setupCanvas(rootId, state, store) {
  let stage = new Konva.Stage({
    container: rootId,
    width: state.assets.sceneWidth,
    height: state.assets.sceneHeight
  });
  let layer = new Konva.Layer({
    scaleX: state.assets.scale,
    scaleY: state.assets.scale
  });
  stage.add(layer);

  let player = createPlayer(state);
  let ground = createGround(state);
  let score = createScore(state);
  let energyBar = createEnergyBar(state);
  let restart = createRestart(state, store);
  let worldObjects = new Konva.Group();
  let fpsCount = new Konva.Text({
    x: 10,
    y: 40,
    text: '0 fps',
    fontSize: "20"
  });
  layer.add(
    ground, worldObjects,
    player, score,
    energyBar, restart,
    fpsCount
  );

  return {
    stage, layer, player, ground,
    score, energyBar, restart,
    worldObjects, fpsCount
  };
};

export function updateObjects(objects, state, fps) {
  objects.player.position(getPlayerData(state));
  objects.ground.position(getGroundData(state));
  objects.score.text(`${state.world.score.steps} m`);

  objects.energyBar
    .getChildren((node) => node.getId() === 'bar')
    .width(state.world.score.energy / 100 * 200);

  updateWorldObjects(objects, state);

  objects.fpsCount.text(`${fps} fps`);
};
