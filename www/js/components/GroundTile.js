import React, { Component } from 'react';
import { Image } from 'react-konva';

export default ({ image, x, y, width, height }) => {
  return (
    <Image
      x={x}
      y={y}
      image={image}
      width={width}
      height={height}
    />
  );
}
