import * as React from 'react';
import { cn } from '@bem-react/classname';

import { TreeItem } from 'schema/Tree';
import { DateTime } from 'components/DateTime/DateTime';

import 'components/FilesTable/FilesTable.scss';
import 'styles/Table.scss';

const cnFilesTable = cn('FilesTable');

export interface FilesTableProps {
    files: TreeItem[];
    className?: string;
}

export function FilesTable({ files, className }: FilesTableProps) {
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
                {files.map(file => (
                    <tr key={file.hash}>
                        <td className="Table-Data">
                            <a className="Link_plain" href="#">
                                {/*<img src="images/{file.icon}.svg" alt="<%= file.icon %>" />*/}
                                {file.name}
                            </a>
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
