import { FETCH_EDGES, ADD_EDGE } from "../actions/actionTypes";

const initialState = {
  allIds: []
};

const edgesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case FETCH_EDGES:
      return {
        'edge0': {
          id: 'edge0',
          source: 'circle1',
          target: 'circle2'
        },
        allIds: ['edge0']
      };
    case ADD_EDGE:
      const newId = `edge${state.allIds.length}`;
      const { source, target } = action.payload;
      console.log( `Create edge between ${source} and ${target}` )
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