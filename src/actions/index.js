import { NODE_SELECT, RESET_NODE_SELECT, FETCH_NODES, ADD_NODE } from './actionTypes';

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

export const selectNode = node => {
  return {
    type: NODE_SELECT,
    payload: node
  };
};

export const resetSelection = () => {
  return {
    type: RESET_NODE_SELECT
  };
};