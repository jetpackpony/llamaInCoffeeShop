import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Game from './components/Game';
import { resizeCanvas, tick } from './actions';
import initGame from './initGame';

class GameContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = { isLoading: true };
    this.loop = this.loop.bind(this);
  }

  loop(timestamp) {
    this.state.store.dispatch(tick(Math.round(timestamp)));
    this.timer = requestAnimationFrame(this.loop);
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

      this.timer = requestAnimationFrame(this.loop);
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.timer);
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
}

ReactDOM.render(<GameContainer/>, document.getElementById('root'));
