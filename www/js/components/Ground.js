import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image } from 'react-konva';
import { times } from '../utils';

import GroundTile from './GroundTile';

const Ground = ({ x, y, tileWidth, worldWidth }) => {
  const numTiles = Math.ceil(worldWidth / tileWidth) + 1;
  const tiles = times(numTiles).map((i) => (
    <GroundTile key={i} index={i} />
  ));

  return (
    <Group x={x} y={y}>
      {tiles}
    </Group>
  );
};

const mapStateToProps = (state) => {
  const { x, y } = state.world.objects
    .find((obj) => obj.id === 'ground')
    .body.position;
  return {
    x, y,
    tileWidth: state.world.ground.tileWidth,
    //worldWidth: state.world.width
    worldWidth: state.assets.sceneWidth
  };
};

export default connect(mapStateToProps)(Ground);
