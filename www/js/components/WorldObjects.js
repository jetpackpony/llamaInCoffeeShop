import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DisplayObjectContainer } from 'react-pixi';
import WorldObject from './WorldObject';
import { SHOW_COLLISION_BOXES } from '../constants';

const WorldObjects = ({ objects, worldHeight, showCollisionBox }) => {
  return (
    <DisplayObjectContainer>
      {objects.map((obj) => (
        <WorldObject
          key={obj.id}
          obj={obj}
          worldHeight={worldHeight}
          showCollisionBox={showCollisionBox}
        />
      ))
      }
    </DisplayObjectContainer>
  );
};

const mapStateToProps = (state) => {
  const objects =
    state
    .world
    .objects
    .filter((obj) => obj.type === 'obstacle' || obj.type === 'collectable');
  return {
    objects,
    worldHeight: state.world.height,
    showCollisionBox: SHOW_COLLISION_BOXES
  };
};

export default connect(mapStateToProps)(WorldObjects);
