import { combineReducers } from 'redux';

import nodesReducer from './nodesReducer';
import nodeSelectionReducer from './nodeSelectionReducer';
import nodeHoveringReducer from './nodeHoveringReducer';

import edgesReducer from './edgesReducer';


export default combineReducers( {
  nodes: nodesReducer,
  edges: edgesReducer,
  selectedNode: nodeSelectionReducer,
  hoveredNode: nodeHoveringReducer
} );