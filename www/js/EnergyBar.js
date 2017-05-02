import Konva from 'konva';

export function getEnergyBarData(state) {
  return {
    x: (state.world.width - 200) / 2,
    y: 10,
    width: 200,
    height: 30,
    energy: state.world.score.energy
  };
};

export function createEnergyBar(state) {
  let data = getEnergyBarData(state);
  let group = new Konva.Group({
    x: data.x,
    y: data.y
  });

  group.add(new Konva.Rect({
    x: 0,
    y: 0,
    width: data.width,
    height: data.height,
    stroke: "brown",
    strokeWidth: "3"
  }));

  group.add(new Konva.Rect({
    id: 'bar',
    x: 0,
    y: 0,
    width: data.energy / 100 * data.width,
    height: data.height,
    fill: "brown"
  }));

  return group;
};
