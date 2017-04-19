import React, { Component } from 'react';
import { Group } from 'react-konva';
import GroundTile from './GroundTile';

export default class Ground extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      image: null,
      position: { x: 100, y: 100 }
    };
  }
  componentDidMount() {
    const image = new window.Image();
    image.onload = () => {
      const height = 70;
      const width = image.width * height / image.height;
      this.setState({ image, width, height });
    };
    image.src = 'img/groundTile.png';
  }
  render() {
    let numTiles = 10;
    let tiles = [];
    for(let i = 0; i < numTiles; i++) {
      tiles.push(
        <GroundTile
          key={i}
          x={this.state.position.x + this.state.width * i}
          y={this.state.position.y}
          image={this.state.image}
          width={this.state.width}
          height={this.state.height}
        />
      );
    }
    return (
      <Group>
        {tiles}
      </Group>
    );
  }
}
