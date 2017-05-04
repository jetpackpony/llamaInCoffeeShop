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
        worldObjects.addChild(
          (obj.view === 'coffee')
          ? createCollectable(obj.id, data, state.assets.images)
          : createObstacle(obj.id, data, state.assets.images)
        );
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
  const width = state.world.obstacle.width;
  const height = state.world.obstacle.height;
  const x = obj.body.position.x;
  const y = state.world.height - obj.body.position.y - height;
  const offset = 10;

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
};

function createObstacle(id, data, images) {
  const cont = new PIXI.Container();
  cont.id = id;

  const rect = new PIXI.Graphics();
  rect.beginFill(0xDC143C);
  rect.drawRect(0, 0, data.width, data.height);
  rect.endFill();

  const obstacle = new PIXI.Sprite(images["obstacle01.png"]);
  obstacle.width = data.width;
  obstacle.height = data.height;

  cont.addChild(rect, obstacle);
  return cont;
}

function createCollectable(id, data, images) {
  const newObj = new PIXI.Graphics();
  newObj.beginFill(0x228B22);
  newObj.drawRect(0, 0, data.width, data.height);
  newObj.endFill();
  newObj.x = data.x;
  newObj.y = data.y;
  newObj.id = id;
  return newObj;
}
