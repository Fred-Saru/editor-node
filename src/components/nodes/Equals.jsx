import React from 'react';
import Text from '../shapes/Text';
import { connect } from 'react-redux';

class Equals extends React.Component {

  getValue = () => {
    const { inputs } = this.props.node;

    if ( !inputs.entry.link ) return null;

    const { link } = inputs.entry;
    const source = this.props.nodes[link];

    return source.outputs.total.value;
  }

  render() {
    return (
      <Text>{this.getValue()}</Text>
    );
  }
}

const mapStateToProps = ( { graph } ) => {
  const { nodes } = graph;
  return {
    nodes
  };
};

export default connect( mapStateToProps )( Equals );