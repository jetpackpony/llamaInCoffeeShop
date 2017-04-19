import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-konva';

const Obstacle = ({ x, y, width, height, image }) => {
  return (
    <Image
      x={x}
      y={y}
      image={image}
      width={width}
      height={height}
    />
  );
};

const mapStateToProps = (state) => {
  const scale = state.assets.scale;
  const image = state.assets.images.obstacle.imgObject;
  const width = state.world.obstacle.obstacleWidth * scale;
  const height = image.height * (width / image.width);
  return {
    width, height, image
  };
};

export default connect(mapStateToProps)(Obstacle);
