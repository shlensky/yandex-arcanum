import * as React from 'react';
import { cn } from '@bem-react/classname';

// import { AppState } from 'store';
// import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { RouterParams } from 'store/router/types';

import 'components/Section/BlobSection/BlobSection.scss';

const cnBlobSection = cn('BlobSection');

export interface BlobSectionProps extends RouteComponentProps<RouterParams> {}

export default function BlobSection(props: BlobSectionProps) {
    return (
        <section className={cnBlobSection()}>
            <h1>Blob page</h1>
            <div>Id is: {props.match.params.id}</div>
            <Link to="/">View tree page</Link>
        </section>
    );
}
