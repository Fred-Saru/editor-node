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
    const { value } = this.props.node.properties;

    return (
      <Circle size={ size }>
        <Text>{ value }</Text>
      </Circle>
    );
  }

}

export default Value;