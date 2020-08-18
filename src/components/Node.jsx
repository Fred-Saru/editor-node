import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import { selectNode } from '../actions';
import Connector from './shapes/Connector';
import Circle from './shapes/Circle';

class Node extends React.Component {
  node;
  nodeWrapper;

  constructor( props ) {
    super( props );
    const { pos } = props.node.options;
    this.state = {
      dx: pos.x || 0,
      dy: pos.y || 0
    };
  }

  componentDidMount() {

    const drag = d3.drag()
      .on( "drag", () => {
        this.setState( {
          dx: this.state.dx + d3.event.dx,
          dy: this.state.dy + d3.event.dy,
        } );
      } );

    d3.select( this.nodeWrapper )
      .call( drag );

    d3.select( this.node )
      .on( "click", () => {
        d3.event.stopPropagation();
        this.props.selectNode( this.props.node.id );
      } );
  }

  render() {
    const { dx, dy } = this.state;

    const { size } = this.props.node.options;

    return (
      <g
        className='node-wrapper'
        ref={el => this.nodeWrapper = el}
        transform={`translate(${dx}, ${dy})`}
      >
        <g
          className='connectors'>
          <g className="connector">
            <Connector x={size} />
          </g>
          <g className="connector">
            <Connector x={-size} />
          </g>
        </g>
        <g
          ref={el => this.node = el}
          className={`node ${this.props.selectedNode === this.props.node.id ? 'selected' : ''}`}>
          <Circle size={size} />
        </g>
      </g>
    );
  }

}

const mapStateToProps = ( state ) => {
  const { selectedNode } = state;

  return {
    selectedNode
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    selectNode: ( node ) => dispatch( selectNode( node ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Node );