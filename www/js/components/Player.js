import React from 'react';
import { connect } from 'react-redux';
import { Image, Group, Rect } from 'react-konva';

const Player = ({ x, y, image, height, width }) => {
  const offset = 10;
  return (
    <Group>
      <Rect
        x={x + offset}
        y={y + offset}
        width={width - offset*2}
        height={height - offset*2}
        fill="purple"
      />
      {/*
      <Image
        x={x}
        y={y}
        width={width}
        height={height}
        image={image}
      />
        */}
    </Group>
  );
};

const mapStateToProps = (state) => {
  const player = state.world.player;
  const height = player.height;
  const width = player.width;
  const image = state.assets.images.player.imgObject;

  // invert the y coordinate
  const y = state.world.height - player.body.position.y - height;

  return {
    x: player.body.position.x,
    y: y,
    image,
    height,
    width
  };
};

export default connect(mapStateToProps)(Player);
