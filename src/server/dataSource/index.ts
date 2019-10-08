import { REPOS_DIR } from 'env';
import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { Routes } from 'routes';
import { getTree } from 'server/dataSource/tree';
import { getBlob } from 'server/dataSource/blob';
import { getRepos } from 'server/lib/git';

export async function getData(router: RouterState): Promise<Partial<AppState>> {
    if (!router) {
        throw new Error(`Router is not defined`);
    }

    const repos = await getRepos(REPOS_DIR);

    if (router.route === Routes.TREE) {
        const data = await getTree(router);
        return { repos, router, ...data };
    }

    if (router.route === Routes.BLOB) {
        const data = await getBlob(router);
        return { repos, router, ...data };
    }

    if (router.route === Routes.HOME || router.route === Routes.NOT_FOUND) {
        return { repos, router };
    }

    throw new Error(`Cannot find data for route "${router.route}"`);
}
