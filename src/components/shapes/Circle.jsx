import React from 'react';

class Circle extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    size: 5
  };

  render() {
    const { x, y, size, fill } = this.props;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle
          className="circle"
          cx={0}
          cy={0}
          r={size}
          fill={fill}></circle>
        {this.props.children}
      </g>

    );
  }
}

export default Circle;