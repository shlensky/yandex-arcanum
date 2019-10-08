import { combineReducers, Action } from 'redux';
import { routerReducer } from 'store/router/reducers';
import { treeReducer } from 'store/tree/reducers';
import { blobReducer } from 'store/blob/reducers';
import { reposReducer } from 'store/repos/reducers';
import { TreeTypes } from 'store/tree/types';
import { BlobTypes } from 'store/blob/types';
import { ReposActions } from 'store/repos/types';

export const MERGE_STATE = 'MERGE_STATE';

let storeReducer = combineReducers({
    router: routerReducer,
    tree: treeReducer,
    blob: blobReducer,
    repos: reposReducer,
});

export type AppState = ReturnType<typeof storeReducer>;

export type AppTypes = TreeTypes | BlobTypes | ReposActions | MergeStateAction;

export interface MergeStateAction {
    type: typeof MERGE_STATE;
    payload: Partial<AppState>;
}

export function mergeState(state: Partial<AppState>): MergeStateAction {
    return {
        type: MERGE_STATE,
        payload: state,
    };
}

export function rootReducer(state: AppState | undefined, action: Action<any>): AppState {
    state = storeReducer(state, action);

    switch (action.type) {
        case 'MERGE_STATE':
            return { ...state, ...(action as MergeStateAction).payload };
        default:
            return state;
    }
}
