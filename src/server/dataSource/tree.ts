import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { TreeState } from 'store/tree/types';
import { TreeItem } from 'schema/Tree';

export async function getTreeState(): Promise<TreeState> {
    // let response = await getTree();
    let treeItem: TreeItem = {
        name: 'Readme.md',
        hash: '50b5934dd16ad98bfa0f50ac77f6bd63ecd6154d',
        type: 'blob',
        mode: '100644',
        lastCommit: 'h5jdsl',
        lastMessage: '[vcs] add readme',
        committer: 'shlenskiy',
        updated: '2019-10-04 21:30:10',
    };
    let response = [treeItem];

    return response;
}

export async function getTree(router: RouterState): Promise<Partial<AppState>> {
    return {
        router,
        tree: await getTreeState(),
    };
}
