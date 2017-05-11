import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-pixi';

const Score = ({ steps }) => (
  <Text
    x="10" y="10"
    text={`${steps} m`}
    style={{fontSize: 20, fill: "black"}}
  />
);

const mapStateToProps = (state) => {
  return {
    steps: state.world.score.steps
  };
};

export default connect(mapStateToProps)(Score);
