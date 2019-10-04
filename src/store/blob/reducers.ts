import { BlobState, BlobTypes, SET_BLOB_LOADING, SET_BLOB } from 'store/blob/types';

const DEFAULT_STATE: BlobState = {};

export function blobReducer(state: BlobState = DEFAULT_STATE, action: BlobTypes): BlobState {
    switch (action.type) {
        case SET_BLOB:
            return action.payload;
        case SET_BLOB_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}
