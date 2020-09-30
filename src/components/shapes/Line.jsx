import React from 'react';

class Line extends React.Component {
  static defaultProps = {
    start: { x: 0, y: 0 },
    end: { x: 20, y: 20 }
  }

  render() {
    const { start, end } = this.props;

    return (
      <line x1={ start.x } y1={ start.y } x2={ end.x } y2={ end.y } className={ this.props.className }>
        {this.props.children }
      </line>
    );
  }
}

export default Line;