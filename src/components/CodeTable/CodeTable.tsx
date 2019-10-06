import * as React from 'react';
import { cn } from '@bem-react/classname';

import 'components/CodeTable/CodeTable.scss';

const cnCodeTable = cn('CodeTable');

interface CodeTableProps {
    content: string;
}

export function CodeTable({ content }: CodeTableProps) {
    const lines = content.split('\n');
    return (
        <table className={cnCodeTable()}>
            <tbody>
                {lines.map((line, i) => (
                    <tr className={cnCodeTable('Row')} key={i}>
                        <td className={cnCodeTable('LineNumber')}>{i + 1}</td>
                        <td className={cnCodeTable('Code')}>{line}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
