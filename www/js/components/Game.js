import React from 'react';
import { Stage } from 'react-pixi';
import { connect } from 'react-redux';

import Score from './Score';
import FPSCounter from './FPSCounter';
import Player from './Player';
import Ground from './Ground';
import Background from './Background';
import WorldObjects from './WorldObjects';
import { jump, restartGame } from '../actions';
import EnergyBar from './EnergyBar';
import Restart from './Restart';
import Menu from './Menu';

const Game = ({ width, height, resolution, scale, onTouch, gameState }) => {
  return (
    <Stage
      width={width}
      height={height}
      resolution={resolution}
      backgroundColor={0xFFFFFF}
      interactive={true}
      scale={scale}
      touchstart={onTouch}
      style={{
        position: "absolute",
        display: "block",
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <Ground/>
      <Background/>
      <WorldObjects/>
      <Player/>
      <Score/>
      <FPSCounter/>
      <EnergyBar/>
      <Restart/>
      {(gameState === 'lost') ? <Menu/> : null}
    </Stage>
  );
};

const mapStateToProps = (state) => ({
  width: state.assets.sceneWidth,
  height: state.assets.sceneHeight,
  resolution: state.assets.dpr,
  scale: state.assets.scale,
  gameState: state.world.gameState
});

const mapDispatchToProps = { jump, restartGame };

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onTouch(e) {
    const { x, y } = e.data.global;
    if (x > stateProps.width - 50 && y < 50) {
      dispatchProps.restartGame();
    } else {
      dispatchProps.jump();
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Game);
