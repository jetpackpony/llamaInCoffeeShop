import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image } from 'react-konva';

const Obstacles = ({ objects, worldHeight, image, width, height }) => {
  const obstacles = objects.map((obj) => (
    <Image
      key={obj.id}
      x={obj.body.position.x}
      y={worldHeight - obj.body.position.y}
      image={image}
      width={width}
      height={height}
    />
  ));

  return (
    <Group>
      {obstacles}
    </Group>
  );
};

const mapStateToProps = (state) => {
  const image = state.assets.images.obstacle.imgObject;
  const width = state.world.obstacle.obstacleWidth;
  const height = image.height * (width / image.width);
  return {
    objects: state.world.objects.filter((obj) => obj.type === 'obstacle'),
    worldHeight: state.world.height,
    width, height, image
  };
};

export default connect(mapStateToProps)(Obstacles);
