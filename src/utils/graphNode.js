import Graph from "./graph";

const GraphNode = function () {

}

GraphNode.prototype.move = function ( pos ) {
  if ( !pos ) {
    console.warn( "move parameters 'nodeId' and 'pos' are mandatory." );
    return;
  }

  this.pos = pos;

  return this;
}

GraphNode.prototype.connect = function ( slot, targetId, targetSlot ) {

}

export default GraphNode;