import React from 'react';
import Circle from './shapes/Circle';

class Handle extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    size: 6
  }
  render() {

    const { x, y, size } = this.props;

    return (
      <Circle size={size} x={x} y={y}></Circle>
    );
  }
}

export default Handle;