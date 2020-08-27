import { FETCH_NODES, ADD_NODE, MOVE_NODE, CONNECT_NODES } from '../actions/actionTypes';

const initialState = {
  allIds: []
};


const nodesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case ADD_NODE: {
      const newId = `circle${state.allIds.length}`;
      let node = action.payload;
      node.id = newId;
      return {
        ...state,
        [newId]: node,
        allIds: [...state.allIds, newId]
      };
    }
    case CONNECT_NODES:
      const { sourceId, targetId } = action.payload;
      const source = state[sourceId];
      const target = state[targetId];

      if ( target.options.inputType == null
        || source.options.outputType == null
        || ( !Array.isArray( target.options.inputType ) && target.options.inputType !== source.options.outputType )
        || ( Array.isArray( target.options.inputType ) && !target.options.inputType.some( type => type === source.options.outputType ) ) ) {
        return state;
      }

      if ( target.hasOwnProperty( 'inputs' ) ) {
        return {
          ...state,
          [targetId]: {
            ...target,
            inputs: [...target.inputs, sourceId]
          }
        };
      }

      return {
        ...state,
        [targetId]: {
          ...target,
          input: sourceId
        }
      };

    case FETCH_NODES:
      return state;
    case MOVE_NODE: {
      const { id, pos } = action.payload;
      const node = state[id];
      return {
        ...state,
        [id]: {
          ...node,
          options: {
            ...node.options,
            pos
          }
        }
      };
    }
    default:
      return state;
  }
}

export default nodesReducer;