import { REPOS_DIR } from 'env';
import { resolve } from 'path';
import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { BlobState } from 'store/blob/types';

import { getTree as gitGetTree } from 'server/lib/git';

export async function getBlobState(repositoryId: string, branch: string, path: string): Promise<BlobState> {
    const repositoryPath = resolve(REPOS_DIR, repositoryId);
    let blobResponse: BlobState = {
        treeItem: (await gitGetTree(repositoryPath, branch, path))[0],
        contentLoaded: false,
        content: '',
    };

    return blobResponse;
}

export async function getBlob(router: RouterState): Promise<Partial<AppState>> {
    if (!router || !router.params) {
        throw new Error('Router params is mandatory');
    }

    const { repositoryId, commitHash, path } = router.params;

    if (!repositoryId) {
        throw new Error('RepositoryId is mandatory');
    }

    if (!path) {
        throw new Error('Path is mandatory');
    }

    return {
        blob: await getBlobState(repositoryId, commitHash || 'master', path),
    };
}
