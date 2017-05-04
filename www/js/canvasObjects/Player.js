import * as PIXI from 'pixi.js';
import R from 'ramda';
import { SHOW_COLLISION_BOXES } from '../constants';

export default function createOrUpdatePlayer(player, state) {
  const data = getPlayerData(state);
  return updatePlayer(player || createPlayer(data), data);
};

function createPlayer(data) {
  let player = new PIXI.Container();

  if (SHOW_COLLISION_BOXES) {
    var polygon = new PIXI.Graphics();
    polygon.beginFill(0x9932CC);
    polygon.drawPolygon(
      data
      .collisionBounds
      .map((point) => Object.values(point))
      .reduce((res, point) => (res.concat(point)), [])
    );
    polygon.endFill();
    player.addChild(polygon);
  }

  var anim = new PIXI.extras.AnimatedSprite(data.images);
  anim.width = data.width;
  anim.height = data.height;
  anim.animationSpeed = 0.5;
  anim.play();
  player.addChild(anim);

  return player;
}

function updatePlayer(player, data) {
  player.x = data.x;
  player.y = data.y;
  return player;
}

function getPlayerData(state) {
  const player = state.world.player;
  const { width, height } = player;
  const x = player.body.position.x;
  const y = state.world.height - player.body.position.y - height;
  const imgNames = R.times((i) => (`llama0${i + 1}.png`), 6);
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    images: Object.values(R.pick(imgNames, state.assets.images)),
    collisionBounds: player.collisionBounds
  }
}
