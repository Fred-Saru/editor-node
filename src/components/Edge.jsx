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
          <Line start={this.props.source.options.pos} end={this.props.target.options.pos} />
        </g>
      </g>
    );
  }
}

const mapStateToProps = ( { nodes }, ownProps ) => {
  return {
    source: nodes[ownProps.edge.source],
    target: nodes[ownProps.edge.target]
  };
}

export default connect( mapStateToProps )( Edge );