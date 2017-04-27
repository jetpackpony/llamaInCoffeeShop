import { calcVelocity, calcPosition, updateBody } from '../physics';

export default function tickPlayer(world) {
  const timeDiff = (world.timestamp - world.player.body.lastTick) / 1000;
  const newBody = updateBody(world.player.body, timeDiff);

  // If dropped below the ground, clip it
  if (newBody.position.y < world.groundHeight) {
    newBody.position.y = world.groundHeight;
  }

  return {
    ...world,
    player: {
      ...world.player,
      body: {
        ...world.player.body,
        ...newBody,
        lastTick: world.timestamp
      }
    }
  };
};
