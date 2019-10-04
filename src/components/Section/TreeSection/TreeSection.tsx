import * as React from 'react';
import { cn } from '@bem-react/classname';

import { Link } from 'react-router-dom';

// import { AppState } from 'store';
// import { useSelector, useDispatch } from 'react-redux';

import 'components/Section/TreeSection/TreeSection.scss';

const cnTreeSection = cn('TreeSection');

export interface TreeSectionProps {}

export default function TreeSection({  }: TreeSectionProps) {
    return (
        <div className={cnTreeSection()}>
            <h1>Tree page</h1>
            <Link to="/blob/test">View blob page</Link>
        </div>
    );
}
