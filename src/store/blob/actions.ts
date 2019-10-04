import { SetBlobAction, SET_BLOB, BlobState, SET_BLOB_LOADING, SetBlobLoadingAction } from 'store/blob/types';
import { ThunkAction } from 'redux-thunk';
import { AppState, AppTypes } from 'store/index';

export function setBlob(blob: BlobState): SetBlobAction {
    return {
        type: SET_BLOB,
        payload: blob,
    };
}

export function setBlobLoading(loading: boolean): SetBlobLoadingAction {
    return {
        type: SET_BLOB_LOADING,
        payload: loading,
    };
}

export function fetchBlob(blobId: string): ThunkAction<Promise<void>, AppState, string, AppTypes> {
    return async function(dispatch, getState) {
        try {
            let blob = getState().blob;

            if (blob && blob.blob && blob.blob.object === blobId) {
                return;
            }

            dispatch(setBlobLoading(true));

            let response = await fetch('/api/blob/' + blobId);
            let data: BlobState = await response.json();

            dispatch(setBlob(data));
        } finally {
            dispatch(setBlobLoading(false));
        }
    };
}
