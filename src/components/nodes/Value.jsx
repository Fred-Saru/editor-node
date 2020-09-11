import React from 'react';
import Circle from '../shapes/Circle';
import Text from '../shapes/Text';
import Handle from '../Handle';

class Value extends React.Component {
  static defaultProps = {
    size: 25,
    value: 0
  };

  render() {
    const { size } = this.props;
    const { value } = this.props.node.outputs;

    return (
      // <Circle size={size}>
      <>
        <Handle></Handle>
        <Text>{value.value}</Text>
      </>
      //</Circle>
    );
  }

}


export default Value;