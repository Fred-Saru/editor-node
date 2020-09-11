import React from 'react';
import * as d3 from 'd3';
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

  state = {
    sourceId: null,
    isDrawingEdge: false,
    mousePos: null
  };

  componentDidMount() {

    const drag = d3.drag()
      .on( "start", () => {
        if ( d3.event.sourceEvent.shiftKey ) {
          this.setState( {
            sourceId: this.props.node.id,
            isDrawingEdge: true,
          } );
          this.props.hoverNode( null );
        }
      } )
      .on( "drag", () => {

        if ( this.state.isDrawingEdge ) {
          const { x, y } = d3.event;
          this.setState( {
            mousePos: { x, y }
          } );
          return;
        }

        const { id, pos } = this.props.node;
        const newPos = { x: pos.x + d3.event.dx, y: pos.y + d3.event.dy };

        this.props.moveNode( id, newPos );

      } )
      .on( "end", () => {
        // If we are not drawing a new edge we don't care
        if ( !this.state.isDrawingEdge ) return;

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

    d3.select( this.node )
      .call( drag );

    d3.select( this.node )
      .on( "click", () => {
        d3.event.stopPropagation();
        const { id } = this.props.node;
        this.props.selectNode( id );
      } )
      .on( "mouseout", this.handleMouseOver )
      .on( "mouseover", this.handleMouseOver );
  }

  resetEdgeDrawing = () => {
    this.setState( {
      sourceId: null,
      isDrawingEdge: false,
      mousePos: null
    } );
  }

  handleMouseOver = () => {
    if ( this.state.isDrawingEdge ) return;

    const { id } = this.props.node;
    this.props.hoverNode( id );
  }

  handleMouseOut = () => {
    if ( this.state.isDrawingEdge ) return;

    this.props.hoverNode( null );
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
    const { pos } = node;

    return (
      <g
        className='node-wrapper'>
        {this.renderEdge()}

        <svg
          ref={el => this.node = el}
          x={pos.x} y={pos.y}
          className={`node ${this.props.selectedNodeId === this.props.node.id ? 'selected' : ''}`}>
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