import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { TreeState } from 'store/tree/types';

export async function getTreeState(): Promise<TreeState> {
    // let response = await getTree();
    let response = [] as TreeState;

    return response;
}

export async function getTree(router: RouterState): Promise<Partial<AppState>> {
    return {
        router,
        tree: await getTreeState(),
    };
}
