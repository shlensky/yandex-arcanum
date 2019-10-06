import * as React from 'react';
import { cn } from '@bem-react/classname';

import { AppState } from 'store';
import { useSelector } from 'react-redux';
import { FilesTable } from '../../FilesTable/FilesTable';

import 'components/Section/TreeSection/TreeSection.scss';

const cnTreeSection = cn('TreeSection');

export interface TreeSectionProps {}

export default function TreeSection({  }: TreeSectionProps) {
    let files = useSelector((state: AppState) => state.tree);

    return (
        <section className={cnTreeSection(null, ['Body'])}>
            <div className="Layout Layout-Container">
                {files && <FilesTable files={files} className="DesktopOnly" />}
            </div>
        </section>
    );
}
