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

  if (world.gameState === 'loosing' && currentId !== 'fallingAsleep') {
    return {
      id: 'fallingAsleep',
      startedAt: world.timestamp,
      currentFrame: 0
    };
  }

  if (currentId === 'jumping' && newBody.position.y <= world.groundHeight) {
    currentId = 'running';
  }

  if (currentId === 'colliding' && animationFinished(world)) {
    currentId = 'running';
  }

  if (currentId !== 'colliding' && currentId !== 'fallingAsleep') {
    if (world.newCollisions.find(obj => obj.type === 'obstacle')) {
      return {
        id: 'colliding',
        startedAt: world.timestamp,
        currentFrame: 0
      };
    }
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

  if (currentId === 'colliding') {
    return {
      ...world.player.animation,
      id: 'colliding',
      currentFrame: tickAnimation(world.playerAnimations['colliding'], world.player.animation.startedAt, world.timestamp)
    };
  }

  if (currentId === 'fallingAsleep') {
    return {
      ...world.player.animation,
      id: 'fallingAsleep',
      currentFrame: tickAnimation(world.playerAnimations['fallingAsleep'], world.player.animation.startedAt, world.timestamp)
    };
  }
};

const tickAnimation = (animation, startedAt, time) => {
  const timePerFrame = Math.ceil(animation.duration / animation.frames.length);
  const framesSinceStart = Math.floor((time - startedAt) / timePerFrame);
  return framesSinceStart % animation.frames.length;
};

const animationFinished = (world) => {
  const anim = world.player.animation;
  return anim.startedAt + world.playerAnimations[anim.id].duration <= world.timestamp;
};
