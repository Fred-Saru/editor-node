import React from 'react';
import * as d3 from 'd3';

import Circle from './shapes/Circle';
import Node from './Node';

class Graph extends React.Component {
    static defaultProps = {
        gridSpacing: 36,
        gridSize: 40960,
        backgroundFillId: "#grid"
    };

    view;

    constructor( props ) {
        super( props );
        this.state = {
            x: 0,
            y: 0
        };
    }

    componentDidMount() {
        const drag = d3.drag()
            .on( "drag", () => {
                this.setState( {
                    x: ( this.state.x ) + d3.event.dx,
                    y: ( this.state.y ) + d3.event.dy,
                } );
            } );

        d3.select( this.view ).call( drag );
    }

    render() {

        const { x, y } = this.state;

        const {
            gridSpacing,
            gridSize,
            backgroundFillId } = this.props;

        return (
            <>
                <div className="graph-wrapper">
                    <svg className="graph">
                        <defs>
                            <pattern
                                id="grid"
                                width={ gridSpacing }
                                height={ gridSpacing }
                                patternUnits="userSpaceOnUse"
                            >
                                <circle
                                    className="bg-pattern"
                                    cx="18"
                                    cy="18"
                                    r="2">
                                </circle>
                            </pattern>
                        </defs>
                        <g
                            className="view"
                            ref={ el => this.view = el }
                            transform={ `translate(${ x }, ${ y })` }>
                            <rect
                                className="background"
                                x={ -( gridSize || 0 ) / 4 }
                                y={ -( gridSize || 0 ) / 4 }
                                width={ gridSize }
                                height={ gridSize }
                                fill={ `url(${ backgroundFillId || '' })` }
                            ></rect>
                            <g className="entities">
                                <Node>
                                    <Circle gridSpacing={ 10 } gridDotSize={ 50 } />
                                </Node>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="drawer">

                </div>
            </>
        );
    }
}

export default Graph;