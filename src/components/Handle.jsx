import React from 'react';
import Circle from './shapes/Circle';
import Line from './shapes/Line';

class Handle extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    size: 6
  }

  handleEl;

  state = {
    isDragging: false,
    mouseX: 0,
    mouseY: 0
  };

  getMousePosition = ( e ) => {
    const screenCTM = this.handleEl.ownerSVGElement.getScreenCTM();
    return {
      x: ( e.clientX - screenCTM.e ) / screenCTM.a,
      y: ( e.clientY - screenCTM.f ) / screenCTM.d
    };
  }

  handleMouseDown = ( e ) => {
    e.stopPropagation();

    // Move the node at the bottom of the stack

    const coord = this.getMousePosition( e );

    this.setState( {
      isDragging: true,
      mouseX: coord.x,
      mouseY: coord.y
    } );

    this.handleEl.ownerDocument.addEventListener( 'mousemove', this.handleMouseMove );
  }

  handleMouseUp = ( e ) => {
    e.stopPropagation();

    // check the nodes compatibility

    // connect the node

    this.setState( {
      isDragging: false
    } );

    this.handleEl.ownerDocument.removeEventListener( 'mousemove', this.handleMouseMove );
  }

  handleMouseMove = ( e ) => {

    const coord = this.getMousePosition( e );

    this.setState( {
      mouseX: coord.x,
      mouseY: coord.y
    } );
  }

  renderDragElement = () => {
    if ( !this.state.isDragging ) { return null; }

    const { size, x, y } = this.props;
    const { mouseX, mouseY } = this.state;

    return (
      <>
        <Line start={ { x, y } } end={ { x: mouseX, y: mouseY } }></Line>
        <Circle
          size={ size } x={ mouseX } y={ mouseY }
          className='handle'></Circle>

      </>
    );
  }

  render() {

    const { x, y, size } = this.props;

    return (
      <svg z={ 10 }
        onMouseDown={ this.handleMouseDown }
        onMouseUp={ this.handleMouseUp }
        ref={ el => this.handleEl = el }>
        {this.renderDragElement() }
        <Circle
          size={ size } x={ x } y={ y }
          className='handle'></Circle>
      </svg>
    );
  }
}

export default Handle;