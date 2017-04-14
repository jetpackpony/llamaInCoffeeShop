import { updateDisplayObject } from '../physics';

export default (player, timestamp) => {
  return {
    ...player,
    displayObject: updateDisplayObject(player.displayObject, timestamp)
  };
};
