import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group } from 'react-konva';

import Obstacle from './Obstacle';

const Obstacles = ({ objects, worldHeight, scale }) => {
  const obstacles = objects.map((obj) => (
    <Obstacle
      key={obj.id}
      x={obj.body.position.x * scale}
      y={(worldHeight - obj.body.position.y) * scale}
    />
  ));

  return (
    <Group>
      {obstacles}
    </Group>
  );
};

const mapStateToProps = (state) => {
  return {
    objects: state.world.objects.filter((obj) => obj.type === 'obstacle'),
    worldHeight: state.world.height,
    scale: state.assets.scale
  };
};

export default connect(mapStateToProps)(Obstacles);
