import rimraf from 'rimraf';

import { EOL } from 'os';
import { promisify } from 'util';
import { readdir } from 'fs';
import { exec, spawn } from 'child_process';

import { TreeItem } from 'schema/Tree';

const readdirAsync = promisify(readdir);
const execAsync = promisify(exec);

export async function getRepos(reposPath: string) {
    const files = await readdirAsync(reposPath, { withFileTypes: true });
    return files.filter(file => file.isDirectory()).map(file => file.name);
}

export async function cloneRepo(reposPath: string, repoUrl: string) {
    const CLONE_COMMAND = `git --no-pager clone ${repoUrl}`;
    const options = { cwd: reposPath, env: { GIT_TERMINAL_PROMPT: '0' } };

    await execAsync(CLONE_COMMAND, options);
}

export async function removeRepo(repositoryPath: string) {
    await promisify(rimraf)(repositoryPath);
}

function parseCommitLine(line: string) {
    const [hash, created, author, ...message] = line.split('|');
    return { hash, created, author, message: message.join('|') };
}

export async function getCommits(repoPath: string, branch: string) {
    const GET_COMMITS_COMMAND = `git --no-pager log --pretty=format:"%H|%ad|%an|%s" --no-decorate --date=iso ${branch}`;

    return new Promise((resolve, reject) => {
        try {
            const options = { cwd: repoPath };
            exec(GET_COMMITS_COMMAND, options, function(error, stdout) {
                if (error !== null) {
                    reject(error);
                    return;
                }

                const commits = stdout.split(EOL).map(parseCommitLine);
                resolve(commits);
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function getFileDiff(repoPath: string, branch: string, fileName: string) {
    const GET_DIFF_COMMAND = `git --no-pager diff ${branch}^! ${fileName}`;

    return new Promise((resolve, reject) => {
        try {
            const options = { cwd: repoPath };
            exec(GET_DIFF_COMMAND, options, function(error, stdout) {
                if (error !== null) {
                    if (error instanceof RangeError) {
                        resolve({ diff: 'This diff is too large', collapsed: true });
                    }

                    reject(error);
                    return;
                }

                resolve({ diff: stdout });
            });
        } catch (e) {
            reject(e);
        }
    });
}

export async function getDiff(repoPath: string, branch: string) {
    const GET_CHANGED_FILES_COMMAND = `git --no-pager diff --name-status ${branch}^!`;

    return new Promise((resolve, reject) => {
        try {
            const options = { cwd: repoPath };
            exec(GET_CHANGED_FILES_COMMAND, options, async function(error, stdout) {
                if (error !== null) {
                    reject(error);
                    return;
                }

                const changedFiles = stdout.split(EOL).filter(fileName => !!fileName.trim());

                Promise.all(
                    changedFiles.map(async fileNameWithStatus => {
                        const [status, fileName] = fileNameWithStatus.split('\t');

                        const diffObject = status === 'D' ? {} : await getFileDiff(repoPath, branch, fileName);

                        return {
                            status,
                            fileName,
                            ...diffObject,
                        };
                    }),
                )
                    .then(resolve)
                    .catch(reject);
            });
        } catch (e) {
            reject(e);
        }
    });
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

    return spawn('git', args, options);
}
