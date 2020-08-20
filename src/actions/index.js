import { NODE_SELECT, NODE_HOVER, FETCH_NODES, ADD_NODE, FETCH_EDGES, MOVE_NODE, ADD_EDGE } from './actionTypes';

export const getNodes = () => {
  return {
    type: FETCH_NODES
  };
};

export const addNode = () => {
  return {
    type: ADD_NODE
  };
};

export const moveNode = ( payload ) => {
  return {
    type: MOVE_NODE,
    payload
  };
};

export const getEdges = () => {
  return {
    type: FETCH_EDGES
  };
};

export const addEdge = ( source, target ) => {
  return {
    type: ADD_EDGE,
    payload: { source, target }
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