import Konva from 'konva';
import { getPlayerData, createPlayer } from './Player';
import { getGroundData, createGround } from './Ground';
import { createScore } from './Score';
import { createEnergyBar } from './EnergyBar';
import { createRestart } from './Restart';

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
  layer.add(ground, player, score, energyBar, restart);

  return {
    stage, layer, player, ground, score, energyBar, restart
  };
};

export function updateObjects(objects, state) {
  objects.player.position(getPlayerData(state));
  objects.ground.position(getGroundData(state));
  objects.score.text(`${state.world.score.steps} m`);

  objects.energyBar
    .getChildren((node) => node.getId() === 'bar')
    .width(state.world.score.energy / 100 * 200);
};
