import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { BlobState } from 'store/blob/types';

export async function getBlobState(blobId: string): Promise<BlobState> {
    let blobResponse: BlobState = {
        loading: false,
        blob: {
            mode: '100644',
            object: blobId,
            name: 'README.md',
            content: 'Hello world!',
        },
    };

    return blobResponse;
}

export async function getBlob(router: RouterState): Promise<Partial<AppState>> {
    if (!router) {
        throw new Error('Router is not defined');
    }

    return {
        router,
        blob: await getBlobState(router.params.id),
    };
}
