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
  const groundData = getGroundData(state);
  let ground = new Konva.Group(groundData);

  R.times((index) => {
    ground.add(
      new Konva.Rect({
        x: index * groundData.tileWidth,
        y: 0,
        width: groundData.tileWidth,
        height: groundData.tileHeight,
        fill: "grey",
        stroke: "black",
        strokeWidth: 2
      })
    );
  }, groundData.numTiles);

  return ground;
};
