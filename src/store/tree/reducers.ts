import { TreeState, TreeTypes } from 'store/tree/types';

export function treeReducer(state: TreeState = null, action: TreeTypes): TreeState {
    switch (action.type) {
        case 'SET_TREE':
            return action.payload;
        default:
            return state;
    }
}
