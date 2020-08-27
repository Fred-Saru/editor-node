import React from 'react';
import Circle from '../shapes/Circle';
import Text from '../shapes/Text';

class Value extends React.Component {
  static defaultProps = {
    size: 25,
    value: 0
  };

  render() {
    const { size } = this.props;

    return (
      <Circle size={size}>
        <Text>{this.props.node.getResult()}</Text>
      </Circle>
    );
  }

}

export default Value;