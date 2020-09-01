import React from 'react';

import Rect from '../shapes/Rect';
import Text from '../shapes/Text';

class Operator extends React.Component {
  static defaultProps = {
    size: 50,
    rx: 5,
    ry: 5
  };

  render() {

    const { size, rx, ry } = this.props;

    return (
      <Rect width={ size } height={ size } x={ -size / 2 } y={ -size / 2 } rx={ rx } ry={ ry }>
        <Text>+</Text>
      </Rect>
    );
  }
}

export default Operator;