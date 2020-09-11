import { combineReducers } from 'redux';

import graphReducer from './graphReducer';
import nodeSelectionReducer from './nodeSelectionReducer';
import nodeHoveringReducer from './nodeHoveringReducer';

export default combineReducers( {
  graph: graphReducer,
  selectedNode: nodeSelectionReducer,
  hoveredNode: nodeHoveringReducer
} );