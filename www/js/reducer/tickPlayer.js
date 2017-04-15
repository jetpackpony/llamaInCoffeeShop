import { updateDisplayObject } from '../physics';

export default (player, statics, timestamp) => {
  return {
    ...player,
    displayObject: updateDisplayObject(player.displayObject, statics, timestamp)
  };
};
