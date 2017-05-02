import Konva from 'konva';

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
      const canvasObj = existingObjects.getChildren((o) => o.getId() === obj.id)[0];
      if (canvasObj) {
        // Update existing objects
        canvasObj.position(getObjPosition(state, obj));
      } else {
        // Create new objects
        const color = (obj.view === 'coffee') ? 'green' : 'red';
        const newObj = new Konva.Rect({
          id: obj.id,
          fill: color,
          ...getObjPosition(state, obj)
        });
        existingObjects.add(newObj);
      }
    });

  // Remove non-exiting objects
  existingObjects.getChildren().forEach((obj) => {
    if (!stateObjects.find((o) => o.id === obj.getId())) {
      obj.destroy();
    }
  });
};
