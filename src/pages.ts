import { Routes } from 'routes';

import { RouteProps } from 'react-router';
import { lazyComponentBabel } from 'components/Lazy/Lazy';

export const PAGES: Record<Routes, RouteProps> = {
    [Routes.TREE]: {
        exact: true,
        path: ['/:repositoryId', '/:repositoryId/tree/:commitHash/:path([^/]*)'],
        component: lazyComponentBabel(() =>
            import(/* webpackChunkName: "page.tree" */ 'components/Section/TreeSection/TreeSection'),
        ),
    },

    [Routes.BLOB]: {
        path: '/:repositoryId/blob/:commitHash/:path([^/]*)',

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
