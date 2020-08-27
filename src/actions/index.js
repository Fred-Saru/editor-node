import { NODE_SELECT, NODE_HOVER, FETCH_NODES, ADD_NODE, FETCH_EDGES, MOVE_NODE, ADD_EDGE, CONNECT_NODES } from './actionTypes';

export const getNodes = () => {
  return {
    type: FETCH_NODES
  };
};

export const addNode = ( node ) => {
  return {
    type: ADD_NODE,
    payload: node
  };
};

export const moveNode = ( id, pos ) => {
  return {
    type: MOVE_NODE,
    payload: { id, pos }
  };
};

export const connectNodes = ( sourceId, targetId ) => {
  return {
    type: CONNECT_NODES,
    payload: { sourceId, targetId }
  };
};

export const getEdges = () => {
  return {
    type: FETCH_EDGES
  };
};

export const addEdge = ( sourceId, targetId ) => {
  return {
    type: ADD_EDGE,
    payload: { sourceId, targetId }
  };
};

export const selectNode = node => {
  return {
    type: NODE_SELECT,
    payload: node
  };
};

export const hoverNode = node => {
  return {
    type: NODE_HOVER,
    payload: node
  };
};