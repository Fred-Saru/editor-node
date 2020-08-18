import React from 'react';

class Line extends React.Component {
  render() {
    const { start, end } = this.props;

    return (
      <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="black"></line>
    );
  }
}

export default Line;