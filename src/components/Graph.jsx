import React from 'react';
import * as d3 from 'd3';

import Node from './Node';
import Edge from './Edge';
import { connect } from 'react-redux';
import { getNodes, addNode, getEdges, selectNode } from '../actions';

class Graph extends React.Component {
  static defaultProps = {
    gridSpacing: 36,
    gridSize: 40960,
    backgroundFillId: "#grid"
  };

  view;

  constructor( props ) {
    super( props );
    this.state = {
      x: 0,
      y: 0
    };
  }

  componentDidMount() {

    this.props.getNodes();
    this.props.getEdges();

    const drag = d3.drag()
      .on( "drag", () => {
        this.setState( {
          x: ( this.state.x ) + d3.event.dx,
          y: ( this.state.y ) + d3.event.dy,
        } );
      } );

    d3.select( this.view )
      .call( drag )
      .on( "click", () => {
        this.props.resetNodeSelection()
      } );
  }

  render() {

    const { x, y } = this.state;

    const {
      gridSpacing,
      gridSize,
      backgroundFillId } = this.props;

    return (
      <>
        <div className="graph-wrapper">
          <svg className="graph">
            <defs>
              <pattern
                id="grid"
                width={gridSpacing}
                height={gridSpacing}
                patternUnits="userSpaceOnUse"
              >
                <circle
                  className="bg-pattern"
                  cx="18"
                  cy="18"
                  r="2">
                </circle>
              </pattern>
            </defs>
            <g
              className="view"
              ref={el => this.view = el}
              transform={`translate(${x}, ${y})`}>
              <rect
                className="background"
                x={-( gridSize || 0 ) / 4}
                y={-( gridSize || 0 ) / 4}
                width={gridSize}
                height={gridSize}
                fill={`url(${backgroundFillId || ''})`}
              ></rect>
              <g className="entities">
                {
                  this.props.edges.allIds.map( key => {
                    const edge = this.props.edges[key];
                    return (
                      <Edge edge={edge} key={edge.id}>
                      </Edge>
                    );
                  } )
                }
                {
                  this.props.nodes.allIds.map( key => {
                    const node = this.props.nodes[key];
                    return (
                      <Node node={node} key={node.id}>
                      </Node>
                    );
                  } )
                }
              </g>
            </g>
          </svg>
        </div>
        <div className="drawer">
          <button onClick={() => this.props.addNode()}>Add Node</button>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    resetNodeSelection: () => dispatch( selectNode( null ) ),
    getNodes: () => dispatch( getNodes() ),
    getEdges: () => dispatch( getEdges() ),
    addNode: () => dispatch( addNode() ),
  };
}

const mapStateToProps = ( { nodes, edges } ) => {
  return {
    nodes,
    edges
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Graph );