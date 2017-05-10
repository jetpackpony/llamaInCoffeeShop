import React, { Component } from 'react';
import { DisplayObjectContainer, Graphics } from 'react-pixi';

export default class GroundTile extends Component {
  componentDidMount() {
    const graphics = this.refs.rect;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xA9A9A9, 1);
    graphics.drawRect(0, 0, this.props.width, this.props.height);
  }
  render() {
    return (
      <Graphics
        ref='rect'
        x={this.props.index * this.props.width}
        y={0}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}
