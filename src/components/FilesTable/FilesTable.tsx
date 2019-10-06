import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { TreeItem } from 'schema/Tree';
import { DateTime } from 'components/DateTime/DateTime';
import { FileIcon } from 'components/FileIcon/FileIcon';
import { ParentDirectoryLink } from 'components/ParentDirectoryLink/ParentDirectoryLink';

import 'components/FilesTable/FilesTable.scss';
import 'styles/Table.scss';

const cnFilesTable = cn('FilesTable');

export interface FilesTableProps {
    files: TreeItem[];
    className?: string;
}

export function FilesTable({ files, className }: FilesTableProps) {
    const params = useSelector((state: AppState) => state.router && state.router.params);
    if (!params) {
        return null;
    }
    const { repositoryId, commitHash, path } = params;

    return (
        <table className={cnFilesTable(null, ['Table', className])}>
            <thead>
                <tr>
                    <th className="Table-Head">Name</th>
                    <th className="Table-Head">Last commit</th>
                    <th className="Table-Head">Last message</th>
                    <th className="Table-Head">Committer</th>
                    <th className="Table-Head">Updated</th>
                </tr>
            </thead>
            <tbody>
                {path && (
                    <tr>
                        <td className="Table-Data" colSpan={5}>
                            <ParentDirectoryLink />
                        </td>
                    </tr>
                )}
                {files.map(file => (
                    <tr key={file.hash}>
                        <td className="Table-Data">
                            <Link
                                to={`/${repositoryId}/${file.type}/${commitHash}/${file.name}`}
                                className="Link_plain"
                            >
                                <FileIcon type={file.type} />
                                {path ? file.name.replace(path + '/', '') : file.name}
                            </Link>
                        </td>
                        <td className="Table-Data">
                            <a className="Link" href="/">
                                {file.lastCommit}
                            </a>
                        </td>
                        <td className="Table-Data">{file.lastMessage}</td>
                        <td className="Table-Data">
                            <a className="Username" href="#">
                                {file.committer}
                            </a>
                        </td>
                        <td className="Table-Data">
                            <DateTime date={new Date(file.updated)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
