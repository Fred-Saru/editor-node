import { FETCH_EDGES, ADD_EDGE } from "../actions/actionTypes";

const initialState = {
  allIds: []
};

const checkExistingEdge = ( state, sourceId, targetId ) => {
  return state.allIds.some( key => {
    return ( state[key].sourceId === sourceId && state[key].targetId === targetId )
      || ( state[key].sourceId === targetId && state[key].targetId === sourceId );
  } );
}

const edgesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case FETCH_EDGES:
      return state;
    case ADD_EDGE:
      const newId = `edge${state.allIds.length}`;
      const { sourceId, targetId } = action.payload;

      if ( checkExistingEdge( state, sourceId, targetId ) ) {
        return state;
      }

      return {
        ...state,
        [newId]: { id: newId, sourceId, targetId },
        allIds: [...state.allIds, newId]
      }
    default:
      return state;
  }
}

export default edgesReducer;