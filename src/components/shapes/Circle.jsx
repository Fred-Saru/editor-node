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
      <>
        <circle
          className={this.props.className}
          cx={x}
          cy={y}
          r={size}
          fill={fill}></circle>
        {this.props.children}
      </>
    );
  }
}

export default Circle;