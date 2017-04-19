import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image } from 'react-konva';

const GroundTile = ({ index, tileWidth, tileHeight, image }) => {
  return (
    <Image
      x={index * tileWidth}
      y={0}
      image={image}
      width={tileWidth}
      height={tileHeight}
    />
  );
};

const mapStateToProps = (state) => {
  const { tileWidth, tileHeight } = state.world.ground;
  const image = state.assets.images.groundTile.imgObject;
  return {
    tileWidth,
    tileHeight: tileHeight + state.world.groundOffset,
    image
  };
};

export default connect(mapStateToProps)(GroundTile);
