import { FETCH_NODES, ADD_NODE, MOVE_NODE, CONNECT_NODES } from '../actions/actionTypes';

const initialState = {
  allIds: [],
  lastId: 0
};


const nodesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case ADD_NODE: {
      const newId = ++state.lastId;
      let node = action.payload;
      node.id = newId;
      return {
        ...state,
        [ newId ]: node,
        allIds: [ ...state.allIds, newId ],
        lastId: newId
      };
    }
    case CONNECT_NODES:
      const { sourceId, targetId } = action.payload;
      const source = state[ sourceId ];
      const target = state[ targetId ];

      const outSlotId = Object.keys( source.outputs ).find( key => !source.outputs[ key ].links );
      const inSlotId = Object.keys( target.inputs ).find( key => !target.inputs[ key ].link );

      const outSlot = source.outputs[ outSlotId ]
      const inSlot = target.inputs[ inSlotId ]

      if ( inSlot.link != null
        || ( inSlot.type !== 'any'
          && outSlot.type !== 'any'
          && inSlot.type !== outSlot.type ) ) {
        return state;
      }

      return {
        ...state,
        [ sourceId ]: {
          ...source,
          outputs: {
            ...source.outputs,
            [ outSlotId ]: {
              ...outSlot,
              links: [ targetId ]
            }
          }
        },
        [ targetId ]: {
          ...target,
          inputs: {
            ...target.inputs,
            [ inSlotId ]: {
              ...inSlot,
              link: sourceId
            }
          }
        }
      };
    case FETCH_NODES:
      return state;
    case MOVE_NODE: {
      const { id, pos } = action.payload;
      const node = state[ id ];
      return {
        ...state,
        [ id ]: {
          ...node,
          pos
        }
      };
    }
    default:
      return state;
  }
}

export default nodesReducer;