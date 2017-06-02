import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Sprite, DisplayObjectContainer } from 'react-pixi';
import { restartGame } from '../actions';

const Menu = ({ x, y, width, height, blackboardImage, restartGame }) => {
  return (
    <DisplayObjectContainer
      x={x}
      y={y}
    >
      <Sprite
        texture={blackboardImage}
        width={width}
        height={height}
      />
      <Text
        x={width / 2}
        y={20}
        anchor={{ x: 0.5, y: 0 }}
        style={{ fontSize: 40, fill: "white" }}
        text="You dead"
      />
      <Text
        x={width / 2}
        y={height / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{ fontSize: 40, fill: "white" }}
        text="Try again"
        touchstart={restartGame}
        interactive={true}
      />
    </DisplayObjectContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    x: 100,
    y: 50,
    width: state.world.width - 200,
    height: state.world.height - 100,
    blackboardImage: state.assets.images['blackboard.png']
  };
};

const mapDispatchToProps = { restartGame };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
