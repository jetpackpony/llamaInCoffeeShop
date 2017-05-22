import React, { Component } from 'react';
import { DisplayObjectContainer, Graphics, Sprite } from 'react-pixi';

export default ({ index, width, height, image }) => {
  return (
    <Sprite
      texture={image}
      width={width}
      height={height}
      x={index * width}
      y={0}
    />
  );
}
