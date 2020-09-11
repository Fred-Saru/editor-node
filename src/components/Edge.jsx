import React from 'react';
import { connect } from 'react-redux';
import Line from './shapes/Line';

class Edge extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <g
        className='edge-wrapper'>
        <g className='edge'>
          <Line start={this.props.source.pos} end={this.props.target.pos} />
        </g>
      </g>
    );
  }
}

const mapStateToProps = ( { graph }, ownProps ) => {
  const { nodes } = graph;
  return {
    source: nodes[ownProps.edge.sourceId],
    target: nodes[ownProps.edge.targetId]
  };
}

export default connect( mapStateToProps )( Edge );