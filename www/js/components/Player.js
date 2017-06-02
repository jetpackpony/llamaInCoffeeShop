import React, { Component } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { DisplayObjectContainer, Sprite } from 'react-pixi';
import AnimatedSprite from './pixi/AnimatedSprite';
import ManualAnimatedSprite from './pixi/ManualAnimatedSprite';
import { SHOW_COLLISION_BOXES } from '../constants';
import CollisionBox from './CollisionBox';

const Player = ({
  x, y, height, width, animation, currentFrame,
  showCollisionBox, collisionBounds
}) => {
  return (
    <DisplayObjectContainer x={x} y={y}>
      {
        (showCollisionBox)
          ? <CollisionBox bounds={collisionBounds} color={0x9932CC} />
          : null
      }
      {
        (animation.type === 'automated')
          ? (
            <AnimatedSprite
              textures={animation.frames}
              animationSpeed={animation.speed}
              playing={true}
            />
          )
          : (
            <ManualAnimatedSprite
              textures={animation.frames}
              currentFrame={currentFrame}
            />
          )
      }
    </DisplayObjectContainer>
  );
};

const mapStateToProps = (state) => {
  const player = state.world.player;
  const { width, height } = player;
  const x = player.body.position.x;
  const y = state.world.height - player.body.position.y - height;
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    animation: state.world.playerAnimations[player.animation.id],
    currentFrame: player.animation.currentFrame,
    showCollisionBox: SHOW_COLLISION_BOXES,
    collisionBounds: player.collisionBounds
  }
};

export default connect(mapStateToProps)(Player);
