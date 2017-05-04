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
        worldObjects.addChild(createObject(obj.id, data));
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
  const width = obj.objectType.width;
  const height = obj.objectType.height;
  const image = obj.objectType.image;
  const x = obj.body.position.x;
  const y = state.world.height - obj.body.position.y - height;

  return {
    x,
    y,
    width,
    height,
    collisionBounds: obj.collisionBounds,
    image,
    type: obj.type
  };
};

function createObject(id, data) {
  const cont = new PIXI.Container();
  cont.id = id;

  if (SHOW_COLLISION_BOXES) {
    var polygon = new PIXI.Graphics();
    polygon.beginFill((data.type === 'obstacle') ? 0xDC143C : 0x228B22);
    polygon.drawPolygon(
      data
      .collisionBounds
      .map((point) => Object.values(point))
      .reduce((res, point) => (res.concat(point)), [])
    );
    polygon.endFill();
    cont.addChild(polygon);
  }

  const object = new PIXI.Sprite(data.image);
  object.width = data.width;
  object.height = data.height;

  cont.addChild(object);
  return cont;
}
