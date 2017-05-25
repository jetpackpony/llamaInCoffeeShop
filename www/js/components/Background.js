import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sprite } from 'react-pixi';

const mapStateToProps = (state) => {
  const texture = state.assets.images['window.png'];
  const height = state.world.height / 2;
  const width = height / texture.height * texture.width;
  return {
    x: 0,
    y: 0,
    width,
    height,
    texture
  };
};

export default connect(mapStateToProps)(Sprite);
