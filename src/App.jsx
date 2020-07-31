import React from 'react';

import Graph from './components/Graph';

import './styles/main.scss';

const initialGraph = {
    edges: [],
    nodes: []
};

class App extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            graph: initialGraph,
            selected: {}
        };
    }

    onSelectNode = ( e ) => {
        console.log( `onSelectNode: ${ e }` );
    }

    onCreateNode = ( e ) => {
        console.log( `onCreateNode: ${ e }` );
    }

    onUpdateNode = ( e ) => {
        console.log( `onUpdateNode: ${ e }` );
    }

    onDeleteNode = ( e ) => {
        console.log( `onDeleteNode: ${ e }` );
    }

    onSelectEdge = ( e ) => {
        console.log( `onSelectEdge: ${ e }` );
    }

    onCreateEdge = ( e ) => {
        console.log( `onCreateEdge: ${ e }` );
    }

    onSwapEdge = ( e ) => {
        console.log( `onSwapEdge: ${ e }` );
    }

    onDeleteEdge = ( e ) => {
        console.log( `onDeleteEdge: ${ e }` );
    }

    render() {
        const nodes = this.state.graph.nodes;
        const edges = this.state.graph.edges;
        const selected = this.state.selected;
        return (
            <Graph
                nodes={ nodes }
                edges={ edges }
                selected={ selected }>
            </Graph>
        );
    }
}

export default App;