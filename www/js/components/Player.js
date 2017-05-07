import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { DisplayObjectContainer, Sprite } from 'react-pixi';
import AnimatedSprite from './pixi/AnimatedSprite';
import ManualAnimatedSprite from './pixi/ManualAnimatedSprite';

const Player = ({
  x, y, height, width,
  frames,
  currentAnimation, currentFrame
}) => {
  return (
    <DisplayObjectContainer x={x} y={y}>
      <AnimatedSprite
        textures={frames.running}
        animationSpeed={0.5}
        playing={true}
        visible={(currentAnimation === 'running')}
      />
      <ManualAnimatedSprite
        textures={frames.jumping}
        currentFrame={currentFrame}
        visible={(currentAnimation === 'jumping')}
      />
    </DisplayObjectContainer>
  );
};

const mapStateToProps = (state) => {
  const player = state.world.player;
  const { width, height } = player;
  const x = player.body.position.x;
  const y = state.world.height - player.body.position.y - height;
  const runImgNames = R.times((i) => (`llama0${i + 1}.png`), 6);
  const jumpImgNames = R.times((i) => (`llama-jump0${i + 1}.png`), 6);
  const frames = {
    running: Object.values(R.pick(runImgNames, state.assets.images)),
    jumping: Object.values(R.pick(jumpImgNames, state.assets.images))
  }
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    frames,
    currentAnimation: player.currentAnimation,
    currentFrame: player.currentFrame
  }
};

export default connect(mapStateToProps)(Player);
