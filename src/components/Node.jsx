import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import { selectNode, moveNode, hoverNode, addEdge, connectNodes } from '../actions';
import Operator from './nodes/Operator';
import Value from './nodes/Value';
import Line from './shapes/Line';
import Equals from './nodes/Equals';


class Node extends React.Component {
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

        const { id, options } = this.props.node;
        const { pos } = options;
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
        this.props.connectNodes( sourceId, targetId );
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

    const { pos } = this.props.node.options;
    return ( <Line start={pos} end={this.state.mousePos} /> );
  }

  renderNode = () => {
    const { node } = this.props;

    switch ( node.type ) {
      case 'operator':
        return <Operator node={node} size={node.options.size}></Operator>
      case 'value':
        return <Value node={node} size={node.options.size}></Value>
      case 'equal':
        return <Equals node={node} size={node.options.size}></Equals>
      default:
        return null;
    }
  }

  render() {
    const { pos } = this.props.node.options;

    return (
      <g
        className='node-wrapper'>
        {this.renderEdge()}
        <g
          ref={el => this.node = el}
          transform={`translate(${pos.x}, ${pos.y})`}
          className={`node ${this.props.selectedNodeId === this.props.node.id ? 'selected' : ''}`}>
          {this.renderNode()}
        </g>
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
    connectNodes: ( sourceId, targetId ) => dispatch( connectNodes( sourceId, targetId ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Node );