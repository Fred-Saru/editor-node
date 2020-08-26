import React from 'react';
import Circle from '../shapes/Circle';
import Rect from '../shapes/Rect';
import Line from '../shapes/Line';
import Text from '../shapes/Text';

class Equals extends React.Component {
  render() {

    return (
      <g>
        <Line end={{ x: 105, y: 0 }} />
        <Rect width={50} height={50} x={-25} y={-25} rx={5} ry={5}>
          <Text>=</Text>
        </Rect>
        <Circle size={25} x={80} ></Circle>
      </g>
    );
  }
}

export default Equals;