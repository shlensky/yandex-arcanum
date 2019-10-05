import { REPOS_DIR } from 'env';
import { resolve } from 'path';
import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { TreeState } from 'store/tree/types';

import { getTree as gitGetTree } from 'server/lib/git';

export async function getTreeState(): Promise<TreeState> {
    const repositoryId = 'yandex-arcanum';
    const repositoryPath = resolve(REPOS_DIR, repositoryId);
    const treeItems = await gitGetTree(repositoryPath, 'master', '.');

    return treeItems;
}

export async function getTree(router: RouterState): Promise<Partial<AppState>> {
    return {
        router,
        tree: await getTreeState(),
    };
}
