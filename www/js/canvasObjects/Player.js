import * as PIXI from 'pixi.js';

export function getPlayerData(state) {
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
};

export function createPlayer(state) {
  let data = getPlayerData(state);
  var rect = new PIXI.Graphics();
  rect.beginFill(0x9932CC);
  rect.drawRect(0, 0, data.width, data.height);
  rect.endFill();
  rect.x = data.x;
  rect.y = data.y;
  return rect;
};
