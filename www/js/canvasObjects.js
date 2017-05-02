import Konva from 'konva';
import { getPlayerData, createPlayer } from './Player';
import { getGroundData, createGround } from './Ground';

export function setupCanvas(rootId, state) {
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
  layer.add(ground, player);

  return {
    stage, layer, player, ground
  };
};

export function updateObjects(objects, state) {
  objects.player.position(getPlayerData(state));
  objects.ground.position(getGroundData(state));
};
