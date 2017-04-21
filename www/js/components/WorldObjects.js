import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image, Text } from 'react-konva';
import WorldObject from './WorldObject';

const WorldObjects = ({ objects }) => {
  return (
    <Group>
      {objects.map((obj) => (
        <WorldObject key={obj.id} object={obj}/>
      ))
      }
    </Group>
  );
};

const mapStateToProps = (state) => {
  const objects =
    state
    .world
    .objects
    .filter((obj) => obj.type === 'obstacle' || obj.type === 'collectable');
  return {
    objects
  };
};

export default connect(mapStateToProps)(WorldObjects);
