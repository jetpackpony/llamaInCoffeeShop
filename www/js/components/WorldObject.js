import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sprite, DisplayObjectContainer } from 'react-pixi';
import CollisionBox from './CollisionBox';

const WorldObject = ({ obj, worldHeight, showCollisionBox }) => {
  return (
    <DisplayObjectContainer
      x={obj.body.position.x}
      y={worldHeight - obj.body.position.y - obj.objectType.height}
    >
      {
        (showCollisionBox)
          ? (
            <CollisionBox
              bounds={obj.collisionBounds}
              color={(obj.type === 'obstacle') ? 0xDC143C : 0x228B22}
            />
          )
          : null
      }
      <Sprite
        texture={obj.objectType.image}
        width={obj.objectType.width}
        height={obj.objectType.height}
      />
    </DisplayObjectContainer>
  );
};

export default WorldObject;
