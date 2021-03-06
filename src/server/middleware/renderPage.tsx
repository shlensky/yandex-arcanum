import * as React from 'react';

import express from 'express';

import { renderToString } from 'react-dom/server';
import { App } from 'components/App/App@server';

export function renderPage(): express.Handler {
    return (req: express.Request, res: express.Response) => {
        let content = renderToString(<App state={req.state} url={req.url} />);

        res.send('<!DOCTYPE html>' + content).end();
    };
}
