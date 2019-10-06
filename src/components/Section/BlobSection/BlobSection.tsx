import * as React from 'react';
import { cn } from '@bem-react/classname';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { FileView } from 'components/FileView/FileView';

import 'components/Section/BlobSection/BlobSection.scss';

const cnBlobSection = cn('BlobSection');

export default function BlobSection() {
    const blobState = useSelector((state: AppState) => state.blob);

    return (
        <section className={cnBlobSection()}>
            {blobState.treeItem && <FileView treeItem={blobState.treeItem} className="Layout-FileView" />}
        </section>
    );
}
