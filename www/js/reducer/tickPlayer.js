import { calcVelocity, calcPosition, updateBody } from '../physics';

export default function tickPlayer(world) {
  const timeDiff = (world.timestamp - world.player.body.lastTick) / 1000;
  const newBody = updateBody(timeDiff, world.player.body);

  // If dropped below the ground, clip it
  if (newBody.position.y < world.groundHeight) {
    newBody.position.y = world.groundHeight;
  }

  let animation = world.player.currentAnimation;
  if (newBody.position.y <= world.groundHeight) {
    animation = 'running';
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
      currentAnimation: animation,
      animation: (animation === 'jumping') ? updateAnimation(world.player.animation, world.timestamp) : world.player.animation
    }
  };
};

const updateAnimation = (animation, time) => {
  const timePerFrame = Math.ceil(animation.duration / animation.totalFrames);
  const framesSinceStart = Math.floor((time - animation.start) / timePerFrame);
  const newFrame = framesSinceStart % animation.totalFrames;
  return {
    ...animation,
    currentFrame: newFrame
  };
};
