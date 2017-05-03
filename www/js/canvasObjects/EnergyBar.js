import * as PIXI from 'pixi.js';

export default function createOrUpdateEnergyBar(energyBar, state) {
  let data = getEnergyBarData(state);
  return updateEnergyBar(energyBar || createEnergyBar(data), data);
}

function createEnergyBar(data) {
  let group = new PIXI.Container();

  let outline = new PIXI.Graphics();
  outline.lineStyle(3, 0x800000, 1);
  outline.drawRect(0, 0, data.width, data.height);

  let filler = new PIXI.Graphics();
  filler.beginFill(0x800000);
  filler.drawRect(0, 0, data.energy / 100 * data.width, data.height);
  filler.endFill();
  filler.id = 'bar';

  group.addChild(outline, filler);

  group.x = data.x;
  group.y = data.y;

  return group;
}

function updateEnergyBar(energyBar, data) {
  energyBar
    .children
    .find((o) => o.id === 'bar')
    .width = data.energy / 100 * data.width;
  return energyBar;
}

function getEnergyBarData(state) {
  const width = 200;
  return {
    x: (state.world.width - width) / 2,
    y: 10,
    width,
    height: 30,
    energy: state.world.score.energy
  };
}
