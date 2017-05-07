import React from 'react';
import { connect } from 'react-redux';
import { DisplayObjectContainer, Sprite } from 'react-pixi';

const Player = ({ x, y, frame, height, width }) => {
  return (
    <DisplayObjectContainer x={x} y={y}>
      <Sprite
        texture={frame}
      />
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
    frame: state.assets.images['llama01.png']
  }
};

export default connect(mapStateToProps)(Player);
