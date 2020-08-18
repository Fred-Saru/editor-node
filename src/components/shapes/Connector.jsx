import React from 'react';
import Circle from './Circle';
import Rect from './Rect';

class Connector extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0
  };

  render() {
    const { x, y, fill } = this.props;
    return (
      // <Circle x={x} y={y} size="7" fill={fill}></Circle>
      <Rect x={x - 8} y={y - 5} width={16} height={10} fill={fill}></Rect>
    );
  }
}

export default Connector;