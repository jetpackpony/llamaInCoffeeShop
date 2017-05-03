import * as PIXI from 'pixi.js';

export default function createOrUpdateWorldObjects(worldObjects, state) {
  return updateWorldObjects(
    worldObjects || new PIXI.Container(),
    state
  );
};

function updateWorldObjects(worldObjects, state) {
  const stateObjects = state.world.objects;
  stateObjects
    .forEach((obj) => {
      const canvasObj = worldObjects.children.find((o) => o.id === obj.id);
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
        worldObjects.addChild(newObj);
      }
    });

  // Remove non-exiting objects
  worldObjects.children.forEach((obj) => {
    if (!stateObjects.find((o) => o.id === obj.id)) {
      worldObjects.removeChild(obj);
    }
  });

  return worldObjects;
};

function getObjPosition(state, obj) {
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

