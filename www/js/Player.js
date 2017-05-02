import Konva from 'konva';

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
  return new Konva.Rect({
    fill: "purple",
    ...getPlayerData(state)
  });
};
