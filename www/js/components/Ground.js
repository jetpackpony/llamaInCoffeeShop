import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image } from 'react-konva';
import { times } from '../utils';

import GroundTile from './GroundTile';

const Ground = ({ x, y, tileWidth, numTiles }) => {
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
  const scale = state.assets.scale;
  const { x, y } = state.world.objects
    .find((obj) => obj.id === 'ground')
    .body.position;

  const tileWidth = state.world.ground.tileWidth;
  const worldWidth = state.world.width;
  const numTiles = Math.ceil(worldWidth / tileWidth) + 1;
  return {
    x: x * scale,
    y: (state.world.height - y) * scale,
    tileWidth: tileWidth * scale,
    numTiles
  };
};

export default connect(mapStateToProps)(Ground);
