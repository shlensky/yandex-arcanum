import { Blob } from 'schema/Blob';

export const SET_BLOB = 'SET_BLOB';
export const SET_BLOB_LOADING = 'SET_BLOB_LOADING';

export interface SetBlobAction {
    type: typeof SET_BLOB;
    payload: BlobState;
}

export interface SetBlobLoadingAction {
    type: typeof SET_BLOB_LOADING;
    payload: boolean;
}

export interface BlobState {
    loading?: boolean;

    blob?: Blob;
}

export type BlobTypes = SetBlobAction | SetBlobLoadingAction;
