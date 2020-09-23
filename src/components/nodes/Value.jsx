import React from 'react';
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
      <>
        <Handle x={size} y={18}></Handle>
        <Text x={'50%'} y={'50%'}>{value.value}</Text>
      </>
    );
  }

}


export default Value;