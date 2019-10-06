import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { FileIcon } from 'components/FileIcon/FileIcon';

export function ParentDirectoryLink() {
    const params = useSelector((state: AppState) => state.router && state.router.params);
    if (!params) {
        return null;
    }

    const { repositoryId, path } = params;

    let parentPath;
    if (path) {
        const parts = path.split('/');
        parts.pop();
        parentPath = parts.join('/');
    }

    const parentUrl = `/${repositoryId}${parentPath ? `/tree/master/${parentPath}` : ''}`;
    return (
        <Link to={parentUrl} className="Link_plain">
            <FileIcon type="tree" />
            ..
        </Link>
    );
}
