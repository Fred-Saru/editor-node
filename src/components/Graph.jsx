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

  addOperator = () => {
    const operatorNode = {
      type: 'operator',
      pos: { x: 100, y: 100 },
      inputs: {
        'a': {
          name: 'a',
          type: 'number',
          link: null
        },
        'b': {
          name: 'b',
          type: 'number',
          link: null
        }
      },
      outputs: {
        'total': {
          name: 'total',
          type: 'number',
          value: 0,
          links: null
        }
      }
    };

    this.props.addNode( operatorNode );
  }

  addConstant = () => {
    const constNode = {
      type: 'const',
      pos: { x: 100, y: 100 },
      outputs: {
        'value': {
          name: 'value',
          type: 'number',
          value: Math.round( Math.random() * 10 ),
          links: null
        }
      }
    };

    this.props.addNode( constNode );
  }

  addDisplay = () => {
    const displayNode = {
      type: 'display',
      pos: { x: 100, y: 100 },
      inputs: {
        'entry': {
          name: 'entry',
          type: 'any',
          link: null
        }
      }
    }

    this.props.addNode( displayNode );
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
                <g className="edges">
                  {
                    this.props.allLinkIds.map( key => {
                      const link = this.props.links[key];
                      return (
                        <Edge edge={link} key={key}>
                        </Edge>
                      );
                    } )
                  }
                </g>
                <g className="nodes">
                  {
                    this.props.allNodeIds.map( key => {
                      const node = this.props.nodes[key];
                      return (
                        <Node node={node} key={key}>
                        </Node>
                      );
                    } )
                  }
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="drawer">
          <button onClick={() => this.addOperator()}>Add Operator</button>
          <button onClick={() => this.addConstant()}>Add Constant</button>
          <button onClick={() => this.addDisplay()}>Add Equal</button>
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
    addNode: ( node ) => dispatch( addNode( node ) ),
  };
}

const mapStateToProps = ( { graph } ) => {
  const { nodes, links, allNodeIds, allLinkIds } = graph;
  return {
    nodes,
    links,
    allNodeIds,
    allLinkIds
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Graph );