import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Text } from 'react-konva';
import { pauseGame } from '../actions';

class Pause extends Component {
  constructor(...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.state.world.objects);
    this.props.pauseGame();
  }

  render() {
    return (
      <Text
        x={this.props.state.world.width - 50}
        y="10"
        fontSize="30"
        text="II"
        fill="black"
        ontouchstart={this.handleClick}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    state
  };
};

const mapDispatchToProps = { pauseGame };

export default connect(mapStateToProps, mapDispatchToProps)(Pause);
