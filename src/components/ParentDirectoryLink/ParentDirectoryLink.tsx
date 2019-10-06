import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

import { FileIcon } from '../FileIcon/FileIcon';

export function ParentDirectoryLink() {
    const { repositoryId, path } = useParams();

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
