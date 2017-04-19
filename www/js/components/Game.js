import React from 'react';
import { Layer, Stage } from 'react-konva';
import { connect } from 'react-redux';

import Player from './Player';
import Ground from './Ground';

const Game = ({ width, height }) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
        <Player/>
        <Ground/>
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
