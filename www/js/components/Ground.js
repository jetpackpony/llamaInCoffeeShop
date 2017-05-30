import React, { Component } from 'react';
import { connect } from 'react-redux';
import TilingSprite from './pixi/TilingSprite';

export default connect((state) => ({
  x: state.world.ground.body.position.x,
  y: 0,
  width: state.world.width + state.world.ground.tileWidth,
  height: state.world.height,
  texture: state.assets.images['floorTile.png']
}))(TilingSprite);
