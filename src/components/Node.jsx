import React from 'react';
import * as d3 from 'd3';

class Node extends React.Component {
    node;

    constructor( props ) {
        super( props );
        this.state = {
            x: 0,
            y: 0,
            selected: false
        };
    }

    componentDidMount() {

        const drag = d3.drag()
            .on( "drag", () => {
                this.setState( {
                    x: ( this.state.x ) + d3.event.dx,
                    y: ( this.state.y ) + d3.event.dy,
                } );
            } )
            .on( "end", () => {
                this.setState( {
                    selected: true
                } );
            } );

        d3.select( this.node )
            .call( drag );
    }

    render() {
        const { x, y, selected } = this.state;

        return (
            <g
                className={ `node ${ selected ? 'selected' : null }` }
                ref={ el => this.node = el }
                transform={ `translate(${ x }, ${ y })` }>
                { this.props.children }
            </g>
        );
    }

}

export default Node;