import React from 'react';
import { Layer, Stage } from 'react-konva';
import { connect } from 'react-redux';

import Player from './Player';
import Ground from './Ground';
import Obstacles from './Obstacles';

const Game = ({ width, height, scale }) => {
  return (
    <Stage width={width} height={height}>
      <Layer scaleX={scale} scaleY={scale}>
        <Ground/>
        <Player/>
        <Obstacles/>
      </Layer>
    </Stage>
  );
};

const mapStateToProps = (state) => {
  return {
    width: state.assets.sceneWidth,
    height: state.assets.sceneHeight,
    scale: state.assets.scale
  };
};

export default connect(mapStateToProps)(Game);
