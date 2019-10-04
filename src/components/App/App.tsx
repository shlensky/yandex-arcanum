import * as React from 'react';

import { cn } from '@bem-react/classname';

import { Switch, Route } from 'react-router';
import { PAGES } from 'pages';
import { Routes } from 'routes';

import { Header } from 'components/Header/Header';

import 'components/App/App.scss';
import 'styles/Layout.scss';
import 'styles/Link.scss';
import 'styles/Username.scss';

const cnApp = cn('App');

export interface AppProps {}

export function App({  }: AppProps) {
    return (
        <div className={cnApp()}>
            <Header className="Navigation_color_type1" />

            <Switch>
                {(Object.keys(PAGES) as Routes[]).map(route => (
                    <Route key={route} {...PAGES[route]} />
                ))}
            </Switch>
        </div>
    );
}
