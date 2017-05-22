import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DisplayObjectContainer } from 'react-pixi';
import { times } from '../utils';

import GroundTile from './GroundTile';

const Ground = ({ x, y, tileWidth, tileHeight, numTiles }) => {
  const tiles = times(numTiles).map((i) => (
    <GroundTile
      key={i}
      index={i}
      width={tileWidth}
      height={tileHeight}
    />
  ));

  return (
    <DisplayObjectContainer x={x} y={y}>
      {tiles}
    </DisplayObjectContainer>
  );
};

const mapStateToProps = (state) => {
  const { x, y } = state.world.ground.body.position;
  const { tileWidth, tileHeight } = state.world.ground;
  const worldWidth = state.world.width;
  const numTiles = Math.ceil(worldWidth / tileWidth) + 1;
  return {
    x,
    y: state.world.height - y - state.world.groundOffset,
    tileWidth,
    tileHeight: tileHeight + state.world.groundOffset,
    numTiles
  };
};

export default connect(mapStateToProps)(Ground);