import { combineReducers } from 'redux';

import nodesReducer from './nodesReducer';
import nodeSelectionReducer from './nodeSelectionReducer';

export default combineReducers( {
    nodes: nodesReducer,
    selectedNode: nodeSelectionReducer,
} );