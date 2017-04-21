import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image } from 'react-konva';

const Collectables = ({ objects, worldHeight, image, width, height }) => {
  const collectables = objects.map((obj) => (
    <Image
      key={obj.id}
      x={obj.body.position.x}
      y={worldHeight - obj.body.position.y - height}
      image={image}
      width={width}
      height={height}
    />
  ));

  return (
    <Group>
      {collectables}
    </Group>
  );
};

const mapStateToProps = (state) => {
  const image = state.assets.images.collectable.imgObject;
  const width = state.world.collectable.collectableWidth;
  const height = image.height * (width / image.width);
  return {
    objects: state.world.objects.filter((obj) => obj.type === 'collectable'),
    worldHeight: state.world.height,
    width, height, image
  };
};

export default connect(mapStateToProps)(Collectables);
