import React, { Component } from 'react';
import { Graphics } from 'react-pixi';

export default class CollisionBox extends Component {
  componentDidMount() {
    const graphics = this.refs.graphics;
    graphics.beginFill(this.props.color);
    graphics.drawPolygon(
      this.props.bounds
      .map((point) => Object.values(point))
      .reduce((res, point) => (res.concat(point)), [])
    );
    graphics.endFill();
  }
  render() {
    return (
      <Graphics ref='graphics' />
    );
  }
}
