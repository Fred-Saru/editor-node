import { FETCH_EDGES, ADD_EDGE } from "../actions/actionTypes";

const initialState = {
  allIds: []
};

const edgesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case FETCH_EDGES:
      return state;
    case ADD_EDGE:
      const newId = `edge${state.allIds.length}`;
      const { source, target } = action.payload;

      if ( Object.keys( state ).some( key => {
        if ( key === 'allIds' ) return false;

        return ( state[key].source === source && state[key].target === target )
          || ( state[key].source === target && state[key].target === source );
      } ) ) {
        return state;
      }

      return {
        ...state,
        [newId]: { id: newId, source, target },
        allIds: [...state.allIds, newId]
      }
    default:
      return state;
  }
}

export default edgesReducer;