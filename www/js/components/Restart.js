import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, DisplayObjectContainer } from 'react-pixi';
import { restartGame } from '../actions';

const Restart = ({ x }) => {
  return (
    <Text
      x={x}
      y={10}
      style={{ fontSize: 50, fill: "black" }}
      text="⟲"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    x: state.world.width - 50,
  };
};

export default connect(mapStateToProps)(Restart);
