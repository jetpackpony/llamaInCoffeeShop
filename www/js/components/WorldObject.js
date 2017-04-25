import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image } from 'react-konva';

const WorldObject = ({ object, images, width, worldHeight }) => {
  const image = images[object.view].imgObject;
  const height = image.height * (width / image.width);
  return (
    <Image
      x={object.body.position.x}
      y={worldHeight - object.body.position.y - height}
      image={image}
      width={width}
      height={height}
    />
  );
};

const mapStateToProps = (state) => {
  const images = state.assets.images;
  const width = state.world.collectable.width;
  const worldHeight = state.world.height;
  return {
    images,
    worldHeight,
    width
  };
};

export default connect(mapStateToProps)(WorldObject);
