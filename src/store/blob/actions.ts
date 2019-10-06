import {
    SET_TREE_ITEM,
    SET_CONTENT_LOADED,
    SET_CONTENT,
    SetTreeItemAction,
    SetContentLoadedAction,
    SetContentAction,
} from 'store/blob/types';
import { ThunkAction } from 'redux-thunk';
import { AppState, AppTypes } from 'store/index';
import { TreeItem } from '../../schema/Tree';

export function setTreeItem(treeItem: TreeItem): SetTreeItemAction {
    return {
        type: SET_TREE_ITEM,
        payload: treeItem,
    };
}

export function setContentLoaded(contentLoaded: boolean): SetContentLoadedAction {
    return {
        type: SET_CONTENT_LOADED,
        payload: contentLoaded,
    };
}

export function setContent(content: string): SetContentAction {
    return {
        type: SET_CONTENT,
        payload: content,
    };
}

export function fetchContent(
    repositoryId: string,
    commitHash: string,
    path: string,
): ThunkAction<Promise<void>, AppState, string, AppTypes> {
    return async function(dispatch) {
        try {
            dispatch(setContentLoaded(false));

            let response = await fetch(`/api/${repositoryId}/blob/${commitHash}/${path}`);
            let content = await response.text();

            dispatch(setContent(content));
            dispatch(setContentLoaded(true));
        } catch (e) {
            console.error(e);
        }
    };
}
