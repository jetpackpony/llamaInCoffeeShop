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
  var running = new PIXI.extras.AnimatedSprite(data.images.running);
  running.id = 'running';
  running.width = data.width;
  running.height = data.height;
  running.animationSpeed = 0.5;
  running.play();
  player.addChild(running);

  var jumping = new PIXI.extras.AnimatedSprite(data.images.jumping);
  jumping.id = 'jumping';
  jumping.width = data.width;
  jumping.height = data.height;
  jumping.animationSpeed = 0.1;
  jumping.loop = false;
  jumping.visible = false;
  player.addChild(jumping);

  return player;
}

function updatePlayer(player, data) {
  if (data.jump) {
    startJump(player);
  }
  if (data.gameState !== 'playing') {
    stopAnimation(player);
  } else {
    startAnimationIfStopped(player);
  }
  player.x = data.x;
  player.y = data.y;
  return player;
}

function startJump(player) {
  const running = player.children.find((o) => o.id === 'running');
  const jumping = player.children.find((o) => o.id === 'jumping');

  running.visible = false;
  jumping.visible = true;
  jumping.onComplete = () => startRunning(player);
  jumping.play();
}

function startRunning(player) {
  const running = player.children.find((o) => o.id === 'running');
  const jumping = player.children.find((o) => o.id === 'jumping');

  running.visible = true;
  jumping.visible = false;
}

function stopAnimation(player) {
  const running = player.children.find((o) => o.id === 'running');
  const jumping = player.children.find((o) => o.id === 'jumping');

  running.stop();
  jumping.stop();
}

function startAnimationIfStopped(player) {
  const running = player.children.find((o) => o.id === 'running');
  const jumping = player.children.find((o) => o.id === 'jumping');

  if (!running.playing) running.play();
}

function getPlayerData(state) {
  const player = state.world.player;
  const { width, height } = player;
  const x = player.body.position.x;
  const y = state.world.height - player.body.position.y - height;
  const runImgNames = R.times((i) => (`llama0${i + 1}.png`), 6);
  const jumpImgNames = R.times((i) => (`llama-jump0${i + 1}.png`), 6);
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    images: {
      running: Object.values(R.pick(runImgNames, state.assets.images)),
      jumping: Object.values(R.pick(jumpImgNames, state.assets.images)),
    },
    collisionBounds: player.collisionBounds,
    jump: isPlayerJumping(player.body.position.y, state),
    gameState: state.world.gameState
  }
}

function isPlayerJumping(playerY, state) {
  return playerY > state.world.groundHeight + 5;
}
