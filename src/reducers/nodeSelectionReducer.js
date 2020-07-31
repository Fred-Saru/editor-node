import { NODE_SELECT, RESET_NODE_SELECT } from '../actions/actionTypes';

const nodeSelectionReducer = ( state = null, action ) => {
    switch ( action.type ) {
        case NODE_SELECT:
            return action.payload;
        case RESET_NODE_SELECT:
            return null;
        default:
            return state;
    }
}

export default nodeSelectionReducer;