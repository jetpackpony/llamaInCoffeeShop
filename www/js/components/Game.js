import React from 'react';
import { Stage } from 'react-pixi';
import { connect } from 'react-redux';

import Score from './Score';
import Player from './Player';
import Ground from './Ground';
import WorldObjects from './WorldObjects';
import { jump } from '../actions';
import EnergyBar from './EnergyBar';
import Restart from './Restart';

const Game = ({ width, height, resolution, onTouch }) => {
  return (
    <Stage
      width={width}
      height={height}
      resolution={resolution}
      backgroundColor={0xFFFFFF}
      style={{
        position: "absolute",
        display: "block",
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <Player/>
    {/*
    <Stage width={width} height={height} ontouchstart={onTouch}>
      <Layer scaleX={scale} scaleY={scale}>
        <Score/>
        <Ground/>
        <WorldObjects/>
        <Player/>
        <EnergyBar/>
        <Restart/>
      </Layer>
    </Stage>
    */}
    </Stage>
  );
};

const mapStateToProps = (state) => {
  return {
    width: state.assets.sceneWidth,
    height: state.assets.sceneHeight,
    resolution: state.assets.dpr
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTouch: () => dispatch(jump())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
