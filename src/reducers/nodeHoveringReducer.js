import { NODE_HOVER } from '../actions/actionTypes';

const nodeHoveringReducer = ( state = null, action ) => {
  switch ( action.type ) {
    case NODE_HOVER:
      return action.payload;
    default:
      return state;
  }
}

export default nodeHoveringReducer;