import * as React from 'react';
import { cn } from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';
import { fetchContent } from 'store/blob/actions';
import { TreeItem } from 'schema/Tree';
import { FileIcon } from 'components/FileIcon/FileIcon';
import { CodeTable } from 'components/CodeTable/CodeTable';

import 'components/FileView/FileView.scss';
import 'styles/Pane.scss';
import DownloadIcon from 'components/FileView/download.svg';

const cnFileView = cn('FileView');

export interface FileViewProps {
    treeItem: TreeItem;
    className?: string;
}

export function FileView({ treeItem, className }: FileViewProps) {
    const params = useSelector((state: AppState) => state.router && state.router.params);
    if (!params) {
        throw new Error('Params is mandatory');
    }
    const { repositoryId, commitHash, path } = params;

    if (!commitHash || !path) {
        throw new Error('CommitHash & Path is mandatory');
    }

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchContent(repositoryId, commitHash, path));
    }, [repositoryId, commitHash, path]);

    const blobState = useSelector((state: AppState) => state.blob);

    return (
        <div className={cnFileView(null, ['Pane', className])}>
            <div className="Pane-Header">
                <FileIcon type={treeItem.type} className="Pane-FileTypeIcon" />
                {treeItem.name}
                <div className="Pane-Note">{`(${treeItem.size} bytes)`}</div>
                <a
                    href={`/api/${repositoryId}/blob/${commitHash}/${path}`}
                    title="Download"
                    className="Pane-HeaderAux"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <DownloadIcon />
                </a>
            </div>

            <div className="Pane-Body Pane-BodyScroll Scroll Pane-Body_no_padding">
                {blobState.contentLoaded ? <CodeTable content={blobState.content || ''} /> : 'Loading...'}
            </div>
        </div>
    );
}
