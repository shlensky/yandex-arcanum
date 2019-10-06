import { REPOS_DIR } from 'env';
import { resolve } from 'path';
import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { TreeState } from 'store/tree/types';

import { getTree as gitGetTree } from 'server/lib/git';

export async function getTreeState(repositoryId: string, branch: string, path: string): Promise<TreeState> {
    const repositoryPath = resolve(REPOS_DIR, repositoryId);
    const treeItems = await gitGetTree(repositoryPath, branch, path + '/');

    return treeItems;
}

export async function getTree(router: RouterState): Promise<Partial<AppState>> {
    if (!router || !router.params) {
        throw new Error('router params is mandatory');
    }

    const { repositoryId, commitHash, path } = router.params;

    if (!repositoryId) {
        throw new Error('repositoryId is mandatory');
    }

    return {
        router,
        tree: await getTreeState(repositoryId, commitHash || 'master', path || '.'),
    };
}
