import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DisplayObjectContainer, Graphics } from 'react-pixi';

class EnergyBar extends Component {
  componentDidMount() {
    const outline = this.refs.outline;
    outline.lineStyle(3, 0x800000, 1);
    outline.drawRect(0, 0, this.props.width, this.props.height);

    const bar = this.refs.bar;
    bar.beginFill(0x800000);
    bar.drawRect(0, 0, this.props.barWidth, this.props.height);
    bar.endFill();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.barWidth !== this.props.barWidth) {
      this.refs.bar.width = this.props.barWidth;
    }
  }

  render() {
    const { x, y } = this.props;
    return (
      <DisplayObjectContainer x={x} y={y}>
        <Graphics ref="outline"/>
        <Graphics ref="bar"/>
      </DisplayObjectContainer>
    );
  }
};

const mapStateToProps = (state) => {
  const sceneWidth = state.world.width;
  const width = 200;
  return {
    x: (sceneWidth - width) / 2,
    y: 10,
    width,
    height: 30,
    barWidth: state.world.score.energy / 100 * width
  };
};

export default connect(mapStateToProps)(EnergyBar);
