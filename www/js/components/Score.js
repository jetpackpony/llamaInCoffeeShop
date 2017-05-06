import React from 'react';
import { connect } from 'react-redux';
import { Text, Group } from 'react-konva';

const Score = ({ steps }) => (
  <Text
    x="10" y="10"
    text={`${steps} m`}
    fontSize="20"
  />
);

const mapStateToProps = (state) => {
  return {
    steps: state.world.score.steps
  };
};

export default connect(mapStateToProps)(Score);
