import React, { Component } from 'react';
import { Layer, Rect, Stage, Image } from 'react-konva';

export default class Player extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      image: null,
      position: { x: 10, y: 10 }
    };
  }
  componentDidMount() {
    const image = new window.Image();
    image.onload = () => {
      const height = 70;
      const width = image.width * height / image.height;
      this.setState({ image, width, height });
    };
    image.src = 'img/llama.png';
  }
  render() {
    return (
      <Image
        x={this.state.position.x}
        y={this.state.position.y}
        image={this.state.image}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
};
