import { FETCH_NODES, ADD_NODE } from '../actions/actionTypes';

const nodesReducers = ( state = [], action ) => {
  switch ( action.type ) {
    case ADD_NODE:
      return [...state, { id: `circle${state.length}`, pos: { x: 0, y: 0 } }];
    case FETCH_NODES:
      return [
        {
          id: 'circle0',
          type: 'circle',
          options: {
            pos: { x: 250, y: 250 },
            size: 50
          }
        },
        {
          id: 'circle1',
          type: 'circle',
          options: {
            pos: { x: 700, y: 50 },
            size: 50
          }
        },
        {
          id: 'circle2',
          type: 'circle',
          options: {
            pos: { x: 342, y: 864 },
            size: 50
          }
        }
      ];
    default:
      return state;
  }
}

export default nodesReducers;