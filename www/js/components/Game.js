import React from 'react';
import { Layer, Stage } from 'react-konva';
import { connect } from 'react-redux';

import Player from './Player';
import Ground from './Ground';
import Obstacles from './Obstacles';

const Game = ({ width, height }) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
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
    height: state.assets.sceneHeight
  };
};

export default connect(mapStateToProps)(Game);
