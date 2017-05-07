import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { DisplayObjectContainer, Sprite } from 'react-pixi';
import AnimatedSprite from './pixi/AnimatedSprite';

const Player = ({ x, y, frames, height, width }) => {
  return (
    <DisplayObjectContainer x={x} y={y}>
      <AnimatedSprite
        textures={frames}
        animationSpeed={0.5}
        playing={true}
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
  const frames = Object.values(R.pick(runImgNames, state.assets.images));
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    frames
  }
};

export default connect(mapStateToProps)(Player);
