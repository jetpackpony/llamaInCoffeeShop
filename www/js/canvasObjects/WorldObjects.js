import * as PIXI from 'pixi.js';

const getObjPosition = (state, obj) => {
  const width = state.world.collectable.width;
  const height = state.world.collectable.height;
  const x = obj.body.position.x;
  const y = state.world.height - obj.body.position.y - height;
  const offset = 10;

  return {
    x: x + offset,
    y: y + offset,
    width: width - offset * 2,
    height: height - offset * 2
  };
};

export function updateWorldObjects(objects, state) {
  const existingObjects = objects.worldObjects;
  const stateObjects =
    state
    .world
    .objects
    .filter((obj) => obj.type === 'obstacle' || obj.type === 'collectable');

  stateObjects
    .forEach((obj) => {
      const canvasObj = existingObjects.children.find((o) => o.id === obj.id);
      const data = getObjPosition(state, obj);
      if (canvasObj) {
        // Update existing objects
        canvasObj.position.set(data.x, data.y);
      } else {
        // Create new objects
        const color = (obj.view === 'coffee') ? 0x228B22 : 0xDC143C;
        const newObj = new PIXI.Graphics();
        newObj.beginFill(color);
        newObj.drawRect(0, 0, data.width, data.height);
        newObj.endFill();
        newObj.x = data.x;
        newObj.y = data.y;
        newObj.id = obj.id;
        existingObjects.addChild(newObj);
      }
    });

  // Remove non-exiting objects
  existingObjects.children.forEach((obj) => {
    if (!stateObjects.find((o) => o.id === obj.id)) {
      existingObjects.removeChild(obj);
    }
  });
};
