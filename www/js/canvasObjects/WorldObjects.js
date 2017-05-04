import * as PIXI from 'pixi.js';
import { SHOW_COLLISION_BOXES } from '../constants';

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
          ? createObject(
            obj.id, data,
            state.assets.images["collectable01.png"], 0x228B22
          )
          : createObject(
            obj.id, data,
            state.assets.images["obstacle01.png"], 0xDC143C
          )
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
  const width = state.world.collectable.width;
  const height = state.world.collectable.height;
  const x = obj.body.position.x;
  const y = state.world.height - obj.body.position.y - height;

  return {
    x: x,
    y: y,
    width: width,
    height: height,
    collisionBounds: obj.collisionBounds
  };
};

function createObject(id, data, image, color) {
  const cont = new PIXI.Container();
  cont.id = id;

  if (SHOW_COLLISION_BOXES) {
    var polygon = new PIXI.Graphics();
    polygon.beginFill(color);
    polygon.drawPolygon(
      data
      .collisionBounds
      .map((point) => Object.values(point))
      .reduce((res, point) => (res.concat(point)), [])
    );
    polygon.endFill();
    cont.addChild(polygon);
  }

  const object = new PIXI.Sprite(image);
  object.width = data.width;
  object.height = data.height;

  cont.addChild(object);
  return cont;
}
