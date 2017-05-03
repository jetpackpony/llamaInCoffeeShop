import * as PIXI from 'pixi.js';

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
  let group = new PIXI.Container();

  let outline = new PIXI.Graphics();
  outline.lineStyle(3, 0x800000, 1);
  outline.drawRect(0, 0, data.width, data.height);

  let filler = new PIXI.Graphics();
  filler.beginFill(0x800000);
  filler.drawRect(0, 0, data.energy / 100 * data.width, data.height);
  filler.endFill();

  group.addChild(outline, filler);

  group.x = data.x;
  group.y = data.y;

  return group;
};
