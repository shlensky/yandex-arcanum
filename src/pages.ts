import * as React from 'react';

import { Routes } from 'routes';

import HomeSection from 'components/Section/HomeSection/HomeSection';
import NotFoundContent from 'components/Section/NotFoundContent/NotFoundContent';

import { RouteProps } from 'react-router';
import { lazyComponent } from 'components/Lazy/Lazy';

export const PAGES: Record<Routes, RouteProps> = {
    [Routes.HOME]: {
        exact: true,
        path: '/',
        component: HomeSection,
    },

    [Routes.TREE]: {
        exact: true,
        path: ['/:repositoryId', '/:repositoryId/tree/:commitHash/:path([^/]*)'],
        component: lazyComponent({
            async asyncLoader() {
                if (typeof window === 'object') {
                    return import(/* webpackChunkName: "page.tree" */ 'components/Section/TreeSection/TreeSection');
                }

                return { default: React.Fragment };
            },
            syncLoader() {
                if (typeof window === 'undefined') {
                    return require('components/Section/TreeSection/TreeSection');
                }
            },
            // @ts-ignore
            id: require.resolveWeak && require.resolveWeak('components/Section/TreeSection/TreeSection'),
        }),
    },

    [Routes.BLOB]: {
        path: '/:repositoryId/blob/:commitHash/:path([^/]*)',

        component: lazyComponent({
            async asyncLoader() {
                if (typeof window === 'object') {
                    return import(/* webpackChunkName: "page.blob" */ 'components/Section/BlobSection/BlobSection');
                }

                return { default: React.Fragment };
            },
            syncLoader() {
                if (typeof window === 'undefined') {
                    return require('components/Section/BlobSection/BlobSection');
                }
            },
            // @ts-ignore
            id: require.resolveWeak && require.resolveWeak('components/Section/BlobSection/BlobSection'),
        }),
    },

    [Routes.NOT_FOUND]: {
        component: NotFoundContent,
    },
};
