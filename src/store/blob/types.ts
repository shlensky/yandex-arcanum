import { TreeItem } from 'schema/Tree';

export const SET_TREE_ITEM = 'SET_TREE_ITEM';
export const SET_CONTENT_LOADED = 'SET_CONTENT_LOADED';
export const SET_CONTENT = 'SET_CONTENT';

export interface SetTreeItemAction {
    type: typeof SET_TREE_ITEM;
    payload: TreeItem;
}

export interface SetContentLoadedAction {
    type: typeof SET_CONTENT_LOADED;
    payload: boolean;
}

export interface SetContentAction {
    type: typeof SET_CONTENT;
    payload: string;
}

export interface BlobState {
    treeItem?: TreeItem;
    contentLoaded?: boolean;
    content?: string;
}

export type BlobTypes = SetTreeItemAction | SetContentLoadedAction | SetContentAction;
