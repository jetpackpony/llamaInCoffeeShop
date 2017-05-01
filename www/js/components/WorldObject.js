import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Image, Rect } from 'react-konva';

const WorldObject = ({ object, images, width, height, worldHeight }) => {
  //const image = images[object.view].imgObject;
  const color = (object.view === 'coffee') ? 'green' : 'red';
  const x = object.body.position.x;
  const y = worldHeight - object.body.position.y - height;
  const offset = 10;
  return (
    <Group>
      <Rect
        x={x + offset}
        y={y + offset}
        width={width - offset*2}
        height={height - offset*2}
        fill={color}
      />
      {

/*
 *
      <Image
        x={x}
        y={y}
        width={width}
        height={height}
        image={image}
      />
      */
      }
    </Group>
  );
};

const mapStateToProps = (state) => {
  const images = state.assets.images;
  const width = state.world.collectable.width;
  const height = state.world.collectable.height;
  const worldHeight = state.world.height;
  return {
    images,
    worldHeight,
    width,
    height
  };
};

export default connect(mapStateToProps)(WorldObject);
