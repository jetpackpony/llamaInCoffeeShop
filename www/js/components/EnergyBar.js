import React from 'react';
import { connect } from 'react-redux';
import { Group, Rect } from 'react-konva';

const EnergyBar = ({ x, y, width, height, energy }) => {
  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="brown"
        strokeWidth="3"
      />
      <Rect
        x={x}
        y={y}
        width={energy / 100 * width}
        height={height}
        fill="brown"
      />
    </Group>
  );
};

const mapStateToProps = (state) => {
  const sceneWidth = state.world.width;
  const width = 200;
  return {
    x: (sceneWidth - width) / 2,
    y: 10,
    width: width,
    height: 30,
    energy: state.score.energy
  };
};

export default connect(mapStateToProps)(EnergyBar);
