import React, { Component } from 'react';
import ReactPIXI from 'react-pixi';
import { Provider } from 'react-redux';

import { resizeCanvas, tick } from './actions';
import initGame from './initGame';
import Game from './components/Game';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      store: null,
      isLoading: true
    };
    this.loop = this.loop.bind(this);
  }

  loop(timestamp) {
    this.state.store.dispatch(tick(timestamp));
    requestAnimationFrame(this.loop);
  }

  componentDidMount() {
    initGame().then((store) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      store.dispatch(resizeCanvas(width, height, dpr));

      this.setState({
        store,
        isLoading: false
      });

      store.getState().assets.sounds.play('bgMusic');

      requestAnimationFrame(this.loop);
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <Provider store={this.state.store}>
          <Game/>
        </Provider>
      );
    }
  }
};

ReactPIXI.render(React.createElement(App), document.getElementById('root'));
