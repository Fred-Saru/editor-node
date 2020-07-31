import { NODE_SELECT, RESET_NODE_SELECT } from './actionTypes';

export const selectNode = node => {
    return {
        type: NODE_SELECT,
        payload: node
    };
};

export const resetSelection = () => {
    return {
        type: RESET_NODE_SELECT
    };
};