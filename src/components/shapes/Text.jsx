import React from 'react';

class Text extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0
  };

  render() {

    const { x, y } = this.props;

    return (
      <text className='text' textAnchor="middle" alignmentBaseline="middle" x={x} y={y}>{this.props.children}</text>
    );
  }
}

export default Text;