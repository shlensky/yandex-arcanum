import * as React from 'react';

import 'components/CodeTable/CodeTable.scss';

interface CodeTableProps {
    content: string;
}

export function CodeTable({ content }: CodeTableProps) {
    const lines = content.split('\n');
    return (
        <table className="CodeTable">
            <tbody>
                {lines.map((line, i) => (
                    <tr className="CodeTable-Row" key={i}>
                        <td className="CodeTable-LineNumber">{i + 1}</td>
                        <td className="CodeTable-Code">{line}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
