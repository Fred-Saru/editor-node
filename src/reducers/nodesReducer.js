import { FETCH_NODES, ADD_NODE, MOVE_NODE } from '../actions/actionTypes';

const initialState = {
  allIds: []
};


const nodesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case ADD_NODE:
      const newId = `circle${state.allIds.length}`;
      return {
        ...state,
        [newId]: { id: newId, options: { pos: { x: 0, y: 0 }, size: 50 } },
        allIds: [...state.allIds, newId]
      };
    case FETCH_NODES:
      return {
        'circle0': {
          id: 'circle0',
          type: 'circle',
          options: {
            pos: { x: 250, y: 250 },
            size: 50
          }
        },
        'circle1': {
          id: 'circle1',
          type: 'circle',
          options: {
            pos: { x: 700, y: 50 },
            size: 50
          }
        },
        'circle2': {
          id: 'circle2',
          type: 'circle',
          options: {
            pos: { x: 342, y: 564 },
            size: 50
          }
        },
        allIds: ['circle0', 'circle1', 'circle2']
      };
    case MOVE_NODE:
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
    default:
      return state;
  }
}

export default nodesReducer;