import React, { Component } from 'react';
import { Stage, render } from 'react-pixi';
import { resizeCanvas, restartGame, tick, jump } from './actions';
import initGame from './initGame';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.loop = this.loop.bind(this);
    this.state = {
      storeState: null,
      loading: true
    };
    this.store = null;
  }

  loop(timestamp) {
    this.store.dispatch(tick(timestamp));
    this.setState({
      storeState: this.store.getState()
    });

    requestAnimationFrame(this.loop);
  }

  componentDidMount() {
    initGame().then((store) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      store.dispatch(resizeCanvas(width, height, dpr));
      this.store = store;

      this.setState({
        storeState: store.getState(),
        loading: false
      })

      requestAnimationFrame(this.loop);
    });
  }

  render() {
    const store = this.state.storeState;
    return (
      <div>
        {(this.state.loading)
            ? <div>Loading...</div>
            : (
              <Stage
                width={store.assets.sceneWidth}
                height={store.assets.sceneHeight}
                resolution={store.assets.dpr}
                backgroundColor={0xFFFFFF}
                style={{
                  position: "absolute",
                  display: "block",
                  width: `${store.assets.sceneWidth}px`,
                  height: `${store.assets.sceneHeight}px`
                }}
              >
              </Stage>
            )
        }
      </div>
    );
  }
};

render(
  React.createElement(App),
  document.getElementById('root')
);
