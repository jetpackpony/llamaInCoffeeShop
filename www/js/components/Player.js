import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-konva';

const mapStateToProps = (state) => {
  const player = state.world.objects.find((obj) => obj.id === 'player');
  const image = state.assets.images.player.imgObject;
  const height = state.world.player.height;
  const width = image.width * height / image.height;

  // invert the y coordinate
  const y = state.world.height - player.body.position.y;

  return {
    x: player.body.position.x,
    y: y,
    image,
    height,
    width
  };
};

export default connect(mapStateToProps)(Image);
