import React from 'react';
import Circle from './shapes/Circle';

class Handle extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    size: 6
  }

  handle;

  handleMouseDown = ( e ) => {
    e.stopPropagation();
    this.handle.ownerSVGElement.addEventListener( 'mousemove', this.handleMouseMove );
  }

  handleMouseUp = ( e ) => {
    e.stopPropagation();
    this.handle.ownerSVGElement.removeEventListener( 'mousemove', this.handleMouseMove );
  }

  handleMouseMove = ( e ) => {

  }

  render() {

    const { x, y, size } = this.props;

    return (
      <g
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        ref={el => this.handle = el}>
        <Circle
          size={size} x={x} y={y}
          className='handle'></Circle>
      </g>
    );
  }
}

export default Handle;