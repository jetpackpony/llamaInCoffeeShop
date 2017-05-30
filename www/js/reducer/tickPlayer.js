import { calcVelocity, calcPosition, updateBody } from '../physics';

export default function tickPlayer(world) {
  const timeDiff = (world.timestamp - world.player.body.lastTick) / 1000;
  const newBody = updateBody(timeDiff, world.player.body);

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
      },
      animation: updateAnimation(world, newBody)
    }
  };
};

const updateAnimation = (world, newBody) => {
  let currentId = world.player.animation.id;
  if (newBody.position.y <= world.groundHeight) {
    currentId = 'running';
  }

  if (currentId === 'running') {
    return {
      ...world.player.animation,
      id: 'running'
    };
  }

  if (currentId === 'jumping') {
    return {
      ...world.player.animation,
      id: 'jumping',
      currentFrame: tickAnimation(world.playerAnimations['jumping'], world.player.animation.startedAt, world.timestamp)
    };
  }
};

const tickAnimation = (animation, startedAt, time) => {
  const timePerFrame = Math.ceil(animation.duration / animation.frames.length);
  const framesSinceStart = Math.floor((time - startedAt) / timePerFrame);
  return framesSinceStart % animation.frames.length;
};
