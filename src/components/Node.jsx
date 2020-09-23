import React from 'react';
import { connect } from 'react-redux';

import { selectNode, moveNode, hoverNode, addEdge, connectNodes } from '../actions';
import Operator from './nodes/Operator';
import Value from './nodes/Value';
import Line from './shapes/Line';
import Equals from './nodes/Equals';
import Rect from './shapes/Rect';
import Text from './shapes/Text';


class Node extends React.Component {
  static defaultProps = {
    size: 100,
    rx: 5,
    ry: 5
  };

  node;

  constructor( props ) {
    super( props );
    this.state = {
      isDragging: false,
      dx: 0,
      dy: 0,
      x: props.node.pos.x,
      y: props.node.pos.y
    };
  }


  getMousePosition = ( e ) => {
    const screenCTM = this.node.ownerSVGElement.getScreenCTM();
    return {
      x: ( e.clientX - screenCTM.e ) / screenCTM.a,
      y: ( e.clientY - screenCTM.f ) / screenCTM.d
    };
  }

  handleMouseEnter = ( e ) => {
    e.stopPropagation();
    if ( this.state.isDrawingEdge ) return;

    const { id } = this.props.node;
    this.props.hoverNode( id );
  }

  handleMouseLeave = ( e ) => {
    e.stopPropagation();

    if ( this.state.isDrawingEdge ) return;

    this.props.hoverNode( null );
  }

  handleClick = ( e ) => {
    e.stopPropagation();

    const { id } = this.props.node;
    this.props.selectNode( id )
  }

  handleMouseDown = ( e ) => {
    e.stopPropagation();

    if ( e.shiftKey ) {
      this.setState( {
        sourceId: this.props.node.id,
        isDrawingEdge: true,
      } );
      this.props.hoverNode( null );
      return;
    }

    const offset = this.getMousePosition( e );

    this.setState( {
      dx: offset.x,
      dy: offset.y,
      isDragging: true
    } );

    this.node.ownerSVGElement.addEventListener( 'mousemove', this.handleMouseMove );
  }

  handleMouseUp = ( e ) => {
    e.stopPropagation();

    // We are not dragging anymore
    if ( this.state.isDragging ) {
      const { id } = this.props.node;
      const { x, y } = this.state;

      this.setState( {
        isDragging: false
      } );

      this.props.moveNode( id, { x, y } );
      this.node.ownerSVGElement.removeEventListener( 'mousemove', this.handleMouseMove );
    }
  }

  handleMouseMove = ( e ) => {
    e.stopPropagation();

    const coord = this.getMousePosition( e );

    if ( this.state.isDrawingEdge ) {
      this.setState( {
        mousePos: { x: coord.x, y: coord.y }
      } );
      return;
    }

    if ( this.state.isDragging ) {
      const { pos } = this.props.node;

      this.setState( {
        x: pos.x + coord.x - this.state.dx,
        y: pos.y + coord.y - this.state.dy
      } );
    }
  }

  renderNode = () => {
    const { node, size } = this.props;

    switch ( node.type ) {
      case 'operator':
        return <Operator node={node} size={size}></Operator>
      case 'const':
        return <Value node={node} size={size}></Value>
      case 'display':
        return <Equals node={node} size={size}></Equals>
      default:
        return null;
    }
  }

  render() {
    const { node, size, rx, ry } = this.props;
    const { x, y } = this.state;
    const { id: nodeId } = node;
    return (
      <g
        className='node-wrapper'>
        <svg
          ref={el => this.node = el}
          x={x} y={y}
          width={size}
          height={size}
          viewBox={`-1 -1 ${size + 2} ${size + 2}`}
          className={`node ${this.props.selectedNodeId === nodeId ? 'selected' : ''}`}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onClick={this.handleClick}
          pointerEvents='all'>
          <Rect width={size} height={size} x={0} y={0} rx={rx} ry={ry}>
            <svg x={0} y={0}>
              <Text y={10} x={size / 2}>Title</Text>
              <Line start={{ x: 0, y: 18 }} end={{ x: size, y: 18 }}></Line>
            </svg>
            <svg x={0} y={18} width={size} height={size - 18} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
              {this.renderNode()}
            </svg>
          </Rect>
        </svg>
      </g>
    );
  }

}

const mapStateToProps = ( state ) => {
  const { selectedNode, hoveredNode } = state;

  return {
    selectedNodeId: selectedNode,
    hoveredNodeId: hoveredNode
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    selectNode: ( nodeId ) => dispatch( selectNode( nodeId ) ),
    moveNode: ( id, pos ) => dispatch( moveNode( id, pos ) ),
    hoverNode: ( nodeId ) => dispatch( hoverNode( nodeId ) ),
    addEdge: ( sourceId, targetId ) => dispatch( addEdge( sourceId, targetId ) ),
    connectNodes: ( sourceId, sourceSlot, targetId, targetSlot ) => dispatch( connectNodes( sourceId, sourceSlot, targetId, targetSlot ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Node );