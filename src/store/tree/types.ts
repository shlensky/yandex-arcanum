import { TreeItem } from 'schema/Tree';

export const SET_TREE = 'SET_TREE';

export interface SetTreeAction {
    type: typeof SET_TREE;
    payload: TreeState;
}

export type TreeState = TreeItem[] | undefined | null;

export type TreeTypes = SetTreeAction;
