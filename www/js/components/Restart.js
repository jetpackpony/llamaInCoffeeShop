import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Group, Text } from 'react-konva';
import { restartGame } from '../actions';

class Restart extends Component {
  constructor(...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.restartGame();
  }

  render() {
    return (
      <Text
        x={this.props.x}
        y="10"
        fontSize="30"
        text="⟲"
        fill="black"
        ontouchstart={this.handleClick}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    x: state.world.width - 50,
  };
};

const mapDispatchToProps = { restartGame };

export default connect(mapStateToProps, mapDispatchToProps)(Restart);
