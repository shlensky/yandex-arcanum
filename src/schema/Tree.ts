export interface TreeItem {
    name: string;
    hash: string;
    type: 'blob' | 'tree';
    mode: string;
    lastCommit: string;
    lastMessage: string;
    committer: string;
    updated: string;
}
