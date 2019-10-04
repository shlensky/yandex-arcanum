import { TreeItem } from 'schema/Tree';
import { SET_TREE, SetTreeAction } from 'store/tree/types';

export function setTree(tree: TreeItem[]): SetTreeAction {
    return {
        type: SET_TREE,
        payload: tree,
    };
}
