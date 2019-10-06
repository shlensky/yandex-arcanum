export interface TreeItem {
    name: string;
    hash: string;
    type: 'blob' | 'tree';
    size: string;
    mode: string;
    lastCommit: string;
    lastMessage: string;
    committer: string;
    updated: string;
}
