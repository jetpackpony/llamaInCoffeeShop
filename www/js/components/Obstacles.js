import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group } from 'react-konva';

import Obstacle from './Obstacle';

const Obstacles = ({ objects }) => {
  const obstacles = objects.map((obj) => (
    <Obstacle
      key={obj.id}
      x={obj.body.position.x}
      y={obj.body.position.y}
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
    objects: state.world.objects.filter((obj) => obj.type === 'obstacle')
  };
};

export default connect(mapStateToProps)(Obstacles);
