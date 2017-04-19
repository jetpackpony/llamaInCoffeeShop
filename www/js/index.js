import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layer, Rect, Stage, Text } from 'react-konva';

import Player from './components/Player';
import Ground from './components/Ground';

class GameContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = { width: 100, height: 100 };
  }

  componentDidMount() {
    // resize the canvas and things
   // init the store and load the images, then set loading = false and start the game loop
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.setState({
      width, height
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.timer);
  }

  render() {
    return (
      <Stage width={this.state.width} height={this.state.height}>
        <Layer ref="layer">
          <Player/>
          <Ground/>
        </Layer>
      </Stage>
    );
  }
}

ReactDOM.render(<GameContainer/>, document.getElementById('root'));
