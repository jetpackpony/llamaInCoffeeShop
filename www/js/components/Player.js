import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-konva';

const mapStateToProps = (state) => {
  const scale = state.assets.scale;
  const player = state.world.objects.find((obj) => obj.id === 'player');
  const image = state.assets.images.player.imgObject;
  const height = state.world.player.height;
  const width = image.width * height / image.height;

  // invert the y coordinate
  const y = state.world.height - player.body.position.y;

  return {
    x: player.body.position.x * scale,
    y: y * scale,
    height: height * scale,
    width: width * scale,
    image
  };
};

export default connect(mapStateToProps)(Image);
