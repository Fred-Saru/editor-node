import React from 'react';
import Circle from '../shapes/Circle';
import Rect from '../shapes/Rect';
import Line from '../shapes/Line';
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
      <g>
        {/* <Line end={{ x: 105, y: 0 }} />
        <Rect width={50} height={50} x={-25} y={-25} rx={5} ry={5}>
          <Text>=</Text>
        </Rect>
        <Circle size={25} x={80}> */}
        <Text>{this.getValue()}</Text>
        {/* </Circle> */}
      </g>
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