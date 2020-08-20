import { NODE_SELECT } from '../actions/actionTypes';

const nodeSelectionReducer = ( state = null, action ) => {
  switch ( action.type ) {
    case NODE_SELECT:
      return action.payload;
    default:
      return state;
  }
}

export default nodeSelectionReducer;