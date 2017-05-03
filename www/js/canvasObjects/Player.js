import * as PIXI from 'pixi.js';

export default function createOrUpdatePlayer(player, state) {
  const data = getPlayerData(state);
  return updatePlayer(player || createPlayer(data), data);
};

function createPlayer({ width, height }) {
  var rect = new PIXI.Graphics();
  rect.beginFill(0x9932CC);
  rect.drawRect(0, 0, width, height);
  rect.endFill();
  return rect;
}

function updatePlayer(player, data) {
  player.x = data.x;
  player.y = data.y;
  return player;
}

function getPlayerData(state) {
  const offset = 10;
  const player = state.world.player;
  const { width, height } = player;
  const x = player.body.position.x;
  const y = state.world.height - player.body.position.y - height;
  return {
    x: x + offset,
    y: y + offset,
    width: width - offset*2,
    height: height - offset*2,
  }
}
