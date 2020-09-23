import React from 'react';
import { connect } from 'react-redux';

import Node from './Node';
import Edge from './Edge';
import { getNodes, addNode, getEdges, selectNode } from '../actions';

class Graph extends React.Component {
  static defaultProps = {
    gridSpacing: 36,
    gridSize: 40960,
    backgroundFillId: "#grid"
  };

  graphWrapper;
  backgroundWrapper;
  graph;

  constructor( props ) {
    super( props );
    this.state = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      mouseX: 0,
      mouseY: 0,
      width: 1366,
      height: 667,
      scale: 1,
      dragging: false
    };
  }

  getMousePosition = ( e ) => {
    const screenCTM = this.graphWrapper.getScreenCTM();
    return {
      x: ( e.clientX - screenCTM.e ) / screenCTM.a,
      y: ( e.clientY - screenCTM.f ) / screenCTM.d
    };
  }

  resetDisplay = () => {
    this.setState( {
      x: 0,
      y: 0,
      scale: 1
    } );
  }

  handleMouseClick = ( e ) => {
    e.stopPropagation();
    this.props.resetNodeSelection();
  }

  handleMouseWheel = ( e ) => {
    e.preventDefault();
    e.stopPropagation();
    const scale = this.state.scale + e.deltaY * -0.001;
    this.setState( {
      scale: Math.min( 2, Math.max( 0.5, scale ) )
    } );
  }

  handleMouseDown = ( e ) => {
    e.stopPropagation();

    const offset = this.getMousePosition( e );
    this.setState(
      {
        dragging: true,
        dx: offset.x + this.state.x,
        dy: offset.y + this.state.y
      } );

  }

  handleMouseUp = ( e ) => {
    e.stopPropagation();

    this.setState(
      {
        dragging: false
      } );
  }

  handleMouseMove = ( e ) => {
    e.stopPropagation();

    const coord = this.getMousePosition( e );

    if ( this.state.dragging ) {
      e.preventDefault();
      e.stopPropagation();

      this.setState( {
        x: -( coord.x - this.state.dx ),
        y: -( coord.y - this.state.dy )
      } );
    }

    this.setState( {
      mouseX: coord.x,
      mouseY: coord.y
    } )
  }

  addOperator = () => {
    const operatorNode = {
      type: 'operator',
      pos: { x: 200, y: 100 },
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

    const { x, y, width, height, scale } = this.state;
    const viewBox = [
      x / scale,
      y / scale,
      width / scale,
      height / scale
    ].join( " " );

    const {
      gridSpacing,
      gridSize,
      backgroundFillId } = this.props;

    return (
      <>
        {/* <div > */}
        <svg className="graph-wrapper" ref={el => this.graphWrapper = el}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onClick={this.handleMouseClick}
          onWheel={this.handleMouseWheel}
          onMouseMove={this.handleMouseMove}>
          <svg className="graph" viewBox={viewBox} ref={el => this.graph = el}>
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
              ref={el => this.backgroundWrapper = el}>
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
          <text x={50} y={660}>{`X: ${this.state.mouseX}, Y: ${this.state.mouseY}`}</text>
        </svg>
        {/* </div> */}
        <div className="drawer">
          <button onClick={() => this.addOperator()}>Add Operator</button>
          <button onClick={() => this.addConstant()}>Add Constant</button>
          <button onClick={() => this.addDisplay()}>Add Equal</button>
          <button onClick={this.resetDisplay}>Reset</button>
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