import React from 'react';
import { connect } from 'react-redux';
import { Text, Group } from 'react-konva';

const Line = ({ text, index }) => (
  <Text
    x="10" y={index * 20}
    text={text}
    fontSize="20"
  />
);

const Metrics = ({ fps, width, height, scale, dpr }) => (
  <Group y="10">
    <Line text={fps} index="0" />
    <Line text={width} index="1" />
    <Line text={height} index="2" />
    <Line text={scale} index="3" />
    <Line text={dpr} index="4" />
  </Group>
);

const mapStateToProps = (state) => {
  return {
    fps: `fps: ${state.metrics.frameRate}`,
    width: `width: ${state.assets.sceneWidth}`,
    height: `height: ${state.assets.sceneHeight}`,
    scale: `scale: ${state.assets.scale}`,
    dpr: `dpr: ${state.assets.dpr}`
  };
};

export default connect(mapStateToProps)(Metrics);
