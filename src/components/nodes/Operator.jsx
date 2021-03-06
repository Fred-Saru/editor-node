import React from 'react';

import Text from '../shapes/Text';
import { connect } from 'react-redux';
import { updateNodeOutput } from '../../actions';
import Handle from '../Handle';

class Operator extends React.Component {
  static defaultProps = {
    size: 50,
    rx: 5,
    ry: 5
  };

  componentDidUpdate = ( prevProps ) => {
    if ( this.checkinputChange( prevProps.node, this.props.node ) ) {
      const { id } = this.props.node;
      this.props.updateOutput( id, 'total', this.getResult() );
    }
  }

  checkinputChange = ( prevNode, actualNode ) => {
    const prevInputs = prevNode.inputs;
    const actualInputs = actualNode.inputs;

    return Object.keys( prevInputs ).some( key => {
      const prevLink = prevInputs[key].link;
      const actualLink = actualInputs[key].link;

      if ( prevLink == null && actualLink == null ) return false;

      return ( prevLink == null && actualLink != null )
        || ( prevLink != null && actualLink == null )
        || prevLink.length !== actualLink.length
    } );
  }

  getResult = () => {
    const inputNodes = Object.keys( this.props.node.inputs ).map( key => {
      const nodeId = this.props.node.inputs[key].link;
      if ( nodeId != null ) {
        return this.props.nodes[nodeId];
      }

      return null;
    } );

    if ( inputNodes.some( input => input == null ) ) { return null; }

    return inputNodes.reduce( ( acc, node ) => acc += node.outputs['value'].value, 0 );
  }

  render() {

    const { size } = this.props;

    return (
      <>
        <Handle x={size} y={18}></Handle>
        <Handle x={0} y={18}></Handle>
        <Handle x={0} y={size - 18}></Handle>
        <Text x={'50%'} y={'50%'}>+</Text>
      </>
    );
  }
}

const mapStateToProps = ( { graph } ) => {
  const { nodes } = graph;
  return {
    nodes
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateOutput: ( nodeId, slotId, value ) => dispatch( updateNodeOutput( nodeId, slotId, value ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Operator );