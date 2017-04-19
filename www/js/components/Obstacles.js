import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group } from 'react-konva';

import Obstacle from './Obstacle';

const Obstacles = ({ objects, worldHeight }) => {
  const obstacles = objects.map((obj) => (
    <Obstacle
      key={obj.id}
      x={obj.body.position.x}
      y={worldHeight - obj.body.position.y}
    />
  ));

  return (
    <Group>
      {obstacles}
    </Group>
  )

};

const mapStateToProps = (state) => {
  return {
    objects: state.world.objects.filter((obj) => obj.type === 'obstacle'),
    worldHeight: state.assets.sceneHeight
  };
};

export default connect(mapStateToProps)(Obstacles);
