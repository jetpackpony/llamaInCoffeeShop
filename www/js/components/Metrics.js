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

const Metrics = ({ fps, width, height, scale, dpr, coffees, tables, energy }) => (
  <Group y="10">
    <Line text={fps} index="0" />
    <Line text={width} index="1" />
    <Line text={height} index="2" />
    <Line text={scale} index="3" />
    <Line text={dpr} index="4" />
    <Line text={coffees} index="5" />
    <Line text={tables} index="6" />
    <Line text={energy} index="7" />
  </Group>
);

const mapStateToProps = (state) => {
  return {
    fps: `fps: ${state.metrics.frameRate}`,
    width: `width: ${state.assets.sceneWidth}`,
    height: `height: ${state.assets.sceneHeight}`,
    scale: `scale: ${state.assets.scale}`,
    dpr: `dpr: ${state.assets.dpr}`,
    coffees: `coffees: ${state.score.coffees}`,
    tables: `tables: ${state.score.tables}`,
    energy: `energy: ${state.score.energy}`
  };
};

export default connect(mapStateToProps)(Metrics);
