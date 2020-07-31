import React from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import { selectNode } from '../actions';

class Node extends React.Component {
    node;

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

        d3.select( this.node )
            .call( drag )
            .on( "click", () => {
                d3.event.stopPropagation();
                this.props.selectNode( { coucouc: 'asdiufasdiof' } );
            } );
    }

    render() {
        const { x, y } = this.state;

        return (
            <g
                className={ `node ${ this.props.selectedNode ? 'selected' : null }` }
                ref={ el => this.node = el }
                transform={ `translate(${ x }, ${ y })` }>
                { this.props.children }
            </g>
        );
    }

}

const mapStateToProps = ( state ) => {
    const { selectedNode } = state;

    return {
        selectedNode
    };
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        selectNode: ( node ) => dispatch( selectNode( node ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Node );