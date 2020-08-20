import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import { selectNode, moveNode, hoverNode, addEdge } from '../actions';
import Circle from './shapes/Circle';
import Line from './shapes/Line';

class Node extends React.Component {
  node;

  state = {
    source: null,
    target: null,
    isDrawingEdge: false,
    mousePos: null
  };

  componentDidMount() {

    const drag = d3.drag()
      .on( "start", () => {
        if ( d3.event.sourceEvent.shiftKey ) {
          this.setState( {
            source: this.props.node.id,
            isDrawingEdge: true,
          } );
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

        const target = this.props.hoveredNode;
        const { source } = this.state;

        if ( target == null ) {
          this.resetEdgeDrawing();
          return;
        }

        this.props.addEdge( source, target );
        this.resetEdgeDrawing();
      } );

    d3.select( this.node )
      .call( drag );

    d3.select( this.node )
      .on( "click", () => {
        d3.event.stopPropagation();
        const { id } = this.props.node;
        this.props.selectNode( id );
      } );
  }

  resetEdgeDrawing = () => {
    this.setState( {
      source: null,
      isDrawingEdge: false,
      mousePos: null
    } );
  }

  handleMouseOver = () => {

    //if ( this.state.isDrawingEdge ) return;

    const { id } = this.props.node;
    this.props.hoverNode( id );
    console.log( "Enter: " + id );
  }

  handleMouseOut = () => {

    //if ( this.state.isDrawingEdge ) return;

    this.props.hoverNode( null );
    const { id } = this.props.node;
    console.log( "Leave: " + id );
  }

  renderEdge = () => {
    if ( !this.state.isDrawingEdge
      || !this.state.mousePos ) return null;

    const { pos } = this.props.node.options;
    return ( <Line start={pos} end={this.state.mousePos} /> );
  }

  render() {
    const { pos, size } = this.props.node.options;

    return (
      <g
        className='node-wrapper'
        onMouseOver={( e ) => this.handleMouseOver( e )}
        onMouseOut={this.handleMouseOut}>
        {this.renderEdge()}
        <g
          ref={el => this.node = el}
          transform={`translate(${pos.x}, ${pos.y})`}
          className={`node ${this.props.selectedNodeId === this.props.node.id ? 'selected' : ''}`}>
          <Circle size={size} />
        </g>
      </g>
    );
  }

}

const mapStateToProps = ( state ) => {
  const { selectedNode, hoveredNode } = state;

  return {
    selectedNodeId: selectedNode,
    hoveredNode: hoveredNode
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    selectNode: ( nodeId ) => dispatch( selectNode( nodeId ) ),
    moveNode: ( id, pos ) => dispatch( moveNode( { id, pos } ) ),
    hoverNode: ( nodeId ) => dispatch( hoverNode( nodeId ) ),
    addEdge: ( source, target ) => dispatch( addEdge( source, target ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Node );