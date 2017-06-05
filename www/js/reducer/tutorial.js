import { TUTORIAL_STATES } from '../constants';

export const updateTutorialState = (world) => {
  let tutorial = world.tutorial;

  if (tutorial === TUTORIAL_STATES.OBSTACLE_RUNNING) {
    let obj = world.objects[0];
    if (obj && obj.body.position.x <= world.width / 2) {
      tutorial = TUTORIAL_STATES.OBSTACLE_PAUSED;
    }
  }

  return {
    ...world,
    tutorial
  };
};
