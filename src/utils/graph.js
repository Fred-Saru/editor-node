import GraphNode from './graphNode';
import ConstantNumber from './nodes/base';

// This create a singleton (?) so we can access the state everywhere
const Graph = new ( function () {
  this.registeredNodeTypes = {};

  this.nodesById = {};
  this.allNodeIds = [];

  this.linksById = {};
  this.allLinksIds = [];

  this.lastNodeId = 0;
  this.lastLinkId = 0;

  this.registerNodeType = function ( type, base ) {
    if ( !type || !base ) {
      console.warn( "registerNodeType parameters 'type' and 'base' are mandatory" );
      return;
    }

    // Inheritance without adding a new layer in the prototype chain
    for ( let i in GraphNode.prototype ) {
      if ( !base.prototype[i] ) {
        base.prototype[i] = GraphNode.prototype[i];
      }
    }

    this.registeredNodeTypes[type] = base;
  };

  this.addNode = function ( node ) {
    if ( !node ) {
      console.warn( "addNode parameter 'node' is mandatory" );
      return;
    }

    if ( node.id == null || node.id === -1 ) {
      node.id = ++this.lastNodeId;
    }

    if ( this.nodesById[node.id] != null ) {
      console.warn( "Id already in use, changing it." );
      node.id = ++this.lastNodeId;
    }

    if ( this.lastNodeId < node.id ) {
      this.lastNodeId = node.id;
    }

    this.nodesById[node.id] = node;
    this.allNodeIds.push( node.id );

    return node;
  }

  this.getGraphNodeData = function () {
    return {
      ...this.nodesById,
      allIds: this.allNodeIds
    };
  }

} )()

Graph.registerNodeType( "basic/number", ConstantNumber );

export default Graph;