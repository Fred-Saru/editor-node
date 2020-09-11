import { FETCH_NODES, ADD_NODE, MOVE_NODE, CONNECT_NODES, UPDATE_OUTPUT } from '../actions/actionTypes';

const initialState = {
  nodes: {},
  links: {},
  allNodeIds: [],
  allLinkIds: [],
  lastNodeId: 0,
  lastLinkId: 0,
};

const graphReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case ADD_NODE: {
      const newId = state.lastNodeId + 1;
      const nodeId = 'n' + newId;

      let node = action.payload;
      node.id = nodeId;
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [nodeId]: node,
        },
        allNodeIds: [...state.allNodeIds, nodeId],
        lastNodeId: newId
      };
    }
    case CONNECT_NODES:
      const { sourceId, sourceSlot, targetId, targetSlot } = action.payload;

      if ( !sourceId || !targetId ) return state;

      const source = state.nodes[sourceId];
      const target = state.nodes[targetId];

      const outSlot = source.outputs[sourceSlot];
      const inSlot = target.inputs[targetSlot];

      if ( inSlot.link != null
        || ( inSlot.type !== 'any'
          && outSlot.type !== 'any'
          && inSlot.type !== outSlot.type ) ) {
        return state;
      }

      const newLinkId = state.lastLinkId + 1;
      const linkId = 'l' + newLinkId;

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [sourceId]: {
            ...source,
            outputs: {
              ...source.outputs,
              [sourceSlot]: {
                ...outSlot,
                links: [linkId]
              }
            }
          },
          [targetId]: {
            ...target,
            inputs: {
              ...target.inputs,
              [targetSlot]: {
                ...inSlot,
                link: linkId
              }
            }
          }
        },
        links: {
          ...state.links,
          [linkId]: {
            sourceId,
            sourceSlot,
            targetId,
            targetSlot
          }
        },
        allLinkIds: [...state.allLinkIds, linkId],
        lastLinkId: newLinkId
      };
    case UPDATE_OUTPUT:
      const { nodeId, slotId, value } = action.payload;
      const node = state.nodes[nodeId];
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [nodeId]: {
            ...node,
            outputs: {
              ...node.outputs,
              [slotId]: {
                ...node.outputs[slotId],
                value
              }
            }
          }
        },
      };
    case FETCH_NODES:
      return state;
    case MOVE_NODE: {
      const { id, pos } = action.payload;
      const node = state.nodes[id];
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [id]: {
            ...node,
            pos
          }
        }
      };
    }
    default:
      return state;
  }
}

export default graphReducer;