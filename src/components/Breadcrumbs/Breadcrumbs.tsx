import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from 'store';

import 'components/Breadcrumbs/Breadcrumbs.scss';

const cnBreadcrumbs = cn('Breadcrumbs');

export function Breadcrumbs() {
    const params = useSelector((state: AppState) => state.router && state.router.params);
    if (!params) {
        return null;
    }
    const { repositoryId, commitHash, path } = params;

    const parts = path ? path.split('/') : [];
    const lastPart = parts.pop();

    return (
        <div className={cnBreadcrumbs()}>
            {path ? (
                <Link to={`/${repositoryId}`} className={cnBreadcrumbs('Link')}>
                    {repositoryId}
                </Link>
            ) : (
                <div className={cnBreadcrumbs('Item')}>{repositoryId}</div>
            )}

            {parts.map((part: string, i: number) => (
                <Link
                    to={`/${repositoryId}/tree/${commitHash}/${parts.slice(0, i + 1).join('/')}`}
                    className={cnBreadcrumbs('Link')}
                    key={i}
                >
                    {part}
                </Link>
            ))}
            {lastPart && <div className={cnBreadcrumbs('Item')}>{lastPart}</div>}
        </div>
    );
}
