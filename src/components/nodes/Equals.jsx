import React from 'react';
import Text from '../shapes/Text';
import { connect } from 'react-redux';
import Handle from '../Handle';

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
      <>
        <Handle x={0} y={18}></Handle>
        <Text>{this.getValue()}</Text>
      </>
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