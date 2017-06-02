import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, DisplayObjectContainer } from 'react-pixi';
import { restartGame } from '../actions';

const Menu = ({ x }) => {
  return (
    <Text
      x={200}
      y={200}
      style={{ fontSize: 50, fill: "black" }}
      text="This menu"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    x: state.world.width - 50,
  };
};

export default connect(mapStateToProps)(Menu);
