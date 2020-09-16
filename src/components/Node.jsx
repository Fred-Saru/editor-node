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
    size: 50,
    rx: 5,
    ry: 5
  };

  node;

  constructor( props ) {
    super( props );
    this.state = {
      sourceId: null,
      isDrawingEdge: false,
      isDragging: false,
      mousePos: null,
      dx: 0,
      dy: 0,
      x: props.node.pos.x,
      y: props.node.pos.y
    };
  }


  getMousePosition = ( e ) => {
    const screenCTM = this.node.getScreenCTM();
    return {
      x: ( e.clientX - screenCTM.e ) / screenCTM.a,
      y: ( e.clientY - screenCTM.f ) / screenCTM.d
    };
  }

  componentDidMount() {

    const graph = this.node.parentNode.parentNode.parentNode.parentNode;

    this.node.addEventListener( "mousedown", ( e ) => {
      e.preventDefault();
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
    } );

    this.node.addEventListener( "mousemove", ( e ) => {
      e.preventDefault();
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
    } );

    this.node.addEventListener( "mouseup", ( e ) => {
      e.preventDefault();
      e.stopPropagation();

      // We are not dragging anymore
      if ( this.state.isDragging ) {
        const { id } = this.props.node;
        const { x, y } = this.state;

        this.setState( {
          isDragging: false
        } );

        this.props.moveNode( id, { x, y } );
        return;
      }

      // If we are not drawing a new edge we don't care
      if ( !this.state.isDrawingEdge ) { return; }

      const targetId = this.props.hoveredNodeId;
      const { sourceId } = this.state;

      if ( targetId == null || targetId === sourceId ) {
        this.resetEdgeDrawing();
        return;
      }

      this.props.addEdge( sourceId, targetId );
      this.props.connectNodes( sourceId, "value", targetId, "a" );
      this.resetEdgeDrawing();
    } );

    // this.node.addEventListener( "click", ( e ) => {
    //   e.stopPropagation();
    //   e.preventDefault();

    //   const { id } = this.props.node;
    //   this.props.selectNode( id )
    // } );

    // this.node.addEventListener( "mouseenter", this.handleMouseEnter );
    // this.node.addEventListener( "mouseleave", this.handleMouseLeave );
  }

  resetEdgeDrawing = () => {
    this.setState( {
      sourceId: null,
      isDrawingEdge: false,
      mousePos: null
    } );
  }

  handleMouseEnter = () => {
    if ( this.state.isDrawingEdge ) return;

    const { id } = this.props.node;
    this.props.hoverNode( id );
  }

  handleMouseLeave = () => {
    if ( this.state.isDrawingEdge ) return;

    this.props.hoverNode( null );
  }

  handleClick = () => {
    const { id } = this.props.node;
    this.props.selectNode( id )
  }

  renderEdge = () => {
    if ( !this.state.isDrawingEdge
      || !this.state.mousePos ) return null;

    const { pos } = this.props.node;
    return ( <Line start={pos} end={this.state.mousePos} /> );
  }

  renderNode = () => {
    const { node } = this.props;

    switch ( node.type ) {
      case 'operator':
        return <Operator node={node}></Operator>
      case 'const':
        return <Value node={node}></Value>
      case 'display':
        return <Equals node={node}></Equals>
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
        {this.renderEdge()}

        <svg
          ref={el => this.node = el}
          x={x} y={y}
          className={`node ${this.props.selectedNodeId === nodeId ? 'selected' : ''}`}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}>
          <Rect width={size} height={size} x={0} y={0} rx={rx} ry={ry}>
            <svg x={0} y={0}>
              <Text y={10} x={size / 2}>Title</Text>
              <Line start={{ x: 0, y: 18 }} end={{ x: size, y: 18 }}></Line>
            </svg>
            <svg x={0} y={18} width={size} height={size - 18} viewBox={`-12.5 -9 ${size / 2} ${( size - 18 ) / 2}`}>
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