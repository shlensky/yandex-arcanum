import { EOL } from 'os';
import { promisify } from 'util';
import child from 'child_process';
import fs from 'fs';

import { TreeItem } from 'schema/Tree';

const execAsync = promisify(child.exec);
const readdirAsync = promisify(fs.readdir);

export async function getRepos(reposPath: string) {
    const files = await readdirAsync(reposPath, { withFileTypes: true });
    return files
        .filter(file => file.isDirectory())
        .filter(file => !file.name.startsWith('.'))
        .map(file => ({ name: file.name }));
}

interface ParsedTreeLine {
    mode: string;
    type: 'tree' | 'blob';
    hash: string;
    size: string;
    name: string;
}

function parseTreeLine(line: string): ParsedTreeLine {
    const [modeTypeHash, name] = line.split('\t');
    const [mode, type, hash, size] = modeTypeHash.split(/\s+/g);

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    return { mode, type, hash, size, name } as ParsedTreeLine;
}

async function getTreeItemDetails(repoPath: string, branch: string, line: ParsedTreeLine): Promise<TreeItem> {
    const GET_DETAILS_COMMAND = `git --no-pager log --pretty=format:'%h%n%s%n%cN%n%at%n' -n 1 ${branch} -- ${line.name}`;

    const options = { cwd: repoPath };
    const { stdout } = await execAsync(GET_DETAILS_COMMAND, options);
    const [lastCommit, lastMessage, committer, updated] = stdout.split(EOL);

    return {
        hash: line.hash,
        name: line.name,
        type: line.type,
        size: line.size,
        mode: line.mode,
        lastCommit,
        lastMessage,
        committer,
        updated: new Date(+updated * 1000).toISOString(),
    };
}

function compareFileTypes(a: TreeItem, b: TreeItem) {
    return a.type === 'blob' && b.type === 'blob' ? 0 : a.type === 'blob' ? 1 : -1;
}

function compareFileNames(a: TreeItem, b: TreeItem) {
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
}

export async function getTree(repoPath: string, branch: string, path: string): Promise<TreeItem[]> {
    const GET_TREE_COMMAND = `git --no-pager ls-tree -l ${branch} ${path}`;
    const options = { cwd: repoPath };
    const { stdout } = await execAsync(GET_TREE_COMMAND, options);

    const lines = stdout
        .split(EOL)
        .filter(line => !!line.trim())
        .map(parseTreeLine);

    const treeItems = await Promise.all(lines.map(line => getTreeItemDetails(repoPath, branch, line)));

    return treeItems.sort(compareFileNames).sort(compareFileTypes);
}

export function getBlob(repoPath: string, branch: string, path: string) {
    const args = ['--no-pager', 'show', `${branch}:${path}`];
    const options = { cwd: repoPath };

    return child.spawn('git', args, options);
}
