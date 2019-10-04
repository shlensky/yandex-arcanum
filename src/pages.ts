import { Routes } from 'routes';

import { RouteProps } from 'react-router';
import { lazyComponentBabel } from 'components/Lazy/Lazy';

export const PAGES: Record<Routes, RouteProps> = {
    [Routes.TREE]: {
        exact: true,
        path: '/',
        component: lazyComponentBabel(() =>
            import(/* webpackChunkName: "page.blob" */ 'components/Section/TreeSection/TreeSection'),
        ),
    },

    [Routes.BLOB]: {
        path: '/blob/:id',

        component: lazyComponentBabel(() =>
            import(/* webpackChunkName: "page.blob" */ 'components/Section/BlobSection/BlobSection'),
        ),
    },

    [Routes.NOT_FOUND]: {
        component: lazyComponentBabel(() =>
            import(/* webpackChunkName: "page.notFound" */ 'components/Section/NotFoundContent/NotFoundContent'),
        ),
    },
};
