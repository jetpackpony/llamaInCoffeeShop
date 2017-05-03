import Konva from 'konva';
import R from 'ramda';

export function getGroundData(state) {
  const { x, y } = state.world.ground.body.position;
  const { tileWidth, tileHeight } = state.world.ground;
  const worldWidth = state.world.width;
  const numTiles = Math.ceil(worldWidth / tileWidth) + 1;
  return {
    x,
    y: state.world.height - y - state.world.groundOffset,
    tileWidth,
    tileHeight: tileHeight + state.world.groundOffset,
    numTiles
  };
};

export function createGround(state) {
  const data = getGroundData(state);
  let ground = new PIXI.Container();

  ground.addChild(
    ...R.times((index) => {
      let rect = new PIXI.Graphics();
      rect.lineStyle(2, 0x000000, 1);
      rect.beginFill(0xA9A9A9);
      rect.drawRect(0, 0, data.tileWidth, data.tileHeight);
      rect.endFill();
      rect.x = index * data.tileWidth;
      return rect;
    },
    data.numTiles
  ));

  ground.x = data.x;
  ground.y = data.y;

  return ground;
};
