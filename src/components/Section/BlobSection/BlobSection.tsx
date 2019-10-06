import * as React from 'react';
import { cn } from '@bem-react/classname';
import { useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router';

import { AppState } from 'store';
import { FileView } from 'components/FileView/FileView';
import { Breadcrumbs } from 'components/Breadcrumbs/Breadcrumbs';

import 'components/Section/BlobSection/BlobSection.scss';

const cnBlobSection = cn('BlobSection');

export default function BlobSection() {
    const params = useParams();
    const stateParams = useSelector((state: AppState) => state.router && state.router.params);
    const blobState = useSelector((state: AppState) => state.blob);

    const isValidState = shallowEqual(params, stateParams);
    if (!isValidState) {
        return null;
    }

    return (
        <section className={cnBlobSection()}>
            <div className="Layout-Container">
                <Breadcrumbs />
            </div>
            {blobState.treeItem && <FileView treeItem={blobState.treeItem} className="Layout-FileView" />}
        </section>
    );
}
