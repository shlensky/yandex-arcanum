import { BlobState, BlobTypes, SET_CONTENT, SET_CONTENT_LOADED, SET_TREE_ITEM } from 'store/blob/types';

const DEFAULT_STATE: BlobState = {};

export function blobReducer(state: BlobState = DEFAULT_STATE, action: BlobTypes): BlobState {
    switch (action.type) {
        case SET_TREE_ITEM:
            return {
                ...state,
                treeItem: action.payload,
            };
        case SET_CONTENT_LOADED:
            return {
                ...state,
                contentLoaded: action.payload,
            };
        case SET_CONTENT:
            return {
                ...state,
                content: action.payload,
            };
        default:
            return state;
    }
}
