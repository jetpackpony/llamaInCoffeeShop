import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DisplayObjectContainer, Sprite } from 'react-pixi';

const Background = ({ scenes }) => {
  return (
    <DisplayObjectContainer>
      {scenes.map((scene, i) => (
        <Sprite
          key={scene.id}
          texture={scene.texture}
          x={scene.x}
          y={scene.y}
          width={scene.width}
          height={scene.height}
        />
      ))}
    </DisplayObjectContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    scenes: state.world.background.scenes.map((scene) => ({
      id: scene.id,
      x: scene.body.position.x,
      y: scene.body.position.y,
      width: scene.objectType.width,
      height: scene.objectType.height,
      texture: scene.objectType.image
    }))
  };
};

export default connect(mapStateToProps)(Background);
