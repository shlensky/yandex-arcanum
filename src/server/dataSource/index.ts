import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { Routes } from 'routes';
import { getTree } from 'server/dataSource/tree';
import { getBlob } from 'server/dataSource/blob';

export async function getData(router: RouterState): Promise<Partial<AppState>> {
    if (!router) {
        throw new Error(`Router is not defined`);
    }

    if (router.route === Routes.TREE) {
        return getTree(router);
    }

    if (router.route === Routes.BLOB) {
        return getBlob(router);
    }

    if (router.route === Routes.HOME || router.route === Routes.NOT_FOUND) {
        return {};
    }

    throw new Error(`Cannot find data for route "${router.route}"`);
}
