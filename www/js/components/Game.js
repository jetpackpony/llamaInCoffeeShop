import React from 'react';
import { Layer, Stage } from 'react-konva';
import { connect } from 'react-redux';

import Metrics from './Metrics';
import Player from './Player';
import Ground from './Ground';
import Obstacles from './Obstacles';
import Collectables from './Collectables';
import { jump } from '../actions';

const Game = ({ width, height, scale, onTouch }) => {
  return (
    <Stage width={width} height={height} ontouchstart={onTouch}>
      <Layer scaleX={scale} scaleY={scale}>
        <Metrics/>
        <Ground/>
        <Obstacles/>
        <Collectables/>
        <Player/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onTouch: () => dispatch(jump())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
