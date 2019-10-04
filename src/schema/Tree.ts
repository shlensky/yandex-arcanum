export interface TreeItem {
    name: string;
    object: string;
    type: 'blob' | 'tree';
    mode: string;
}
