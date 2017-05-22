import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-pixi';

const FPSCounter = ({ fps }) => (
  <Text
    x="10" y="40"
    text={`${fps} fps`}
    style={{fontSize: 20, fill: "black"}}
  />
);

const mapStateToProps = (state) => {
  return {
    fps: state.fps.frameRate
  };
};

export default connect(mapStateToProps)(FPSCounter);
