import React from 'react';

class Rect extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0
  };

  render() {

    const { x, y, width, height, rx, ry, fill } = this.props;

    return (
      <>
        <rect x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={rx}
          ry={ry}
          className={this.props.className}
          filter={this.props.filter}></rect>
        {this.props.children}
      </>
    );
  }
}

export default Rect;