import React from 'react';

import Node from '../Node';

class Circle extends Node {
    static defaultProps = {
        gridSpacing: 36,
        gridDotSize: 2
    };

    render() {
        const { gridSpacing, gridDotSize } = this.props;
        return (
            <circle
                className="circle"
                cx={ ( gridSpacing || 0 ) / 2 }
                cy={ ( gridSpacing || 0 ) / 2 }
                r={ gridDotSize }>
            </circle>
        );
    }
}

export default Circle;