import React from 'react';
import Text from '../shapes/Text';
import Handle from '../Handle';

class Value extends React.Component {
  static defaultProps = {
    size: 25,
    value: 0
  };

  render() {
    const { value } = this.props.node.outputs;

    return (
      <>
        <Handle x={5} y={20}></Handle>
        <Text>{value.value}</Text>
      </>
    );
  }

}


export default Value;