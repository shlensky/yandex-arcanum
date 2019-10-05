import express from 'express';

import { join } from 'path';

import { PORT } from 'env';
import { clientAssets } from 'server/middleware/clientAssets';
import { prepareState } from 'server/middleware/prepareState';
import { renderPage } from 'server/middleware/renderPage';
import { treeApi, blobApi } from 'server/middleware/standaloneApi';
import { errorHandler } from 'server/middleware/errorHandler';
import { routeApi } from 'server/middleware/routeApi';

const app = express();

app.use(express.static(join(__dirname, 'client')));

// Standalone API
app.get('/api/tree', treeApi());
app.get('/api/blob/:id', blobApi());

// Universal route API
app.get('/api/route', routeApi());

// Normal page rendering process
app.use(prepareState());
app.use(clientAssets());
app.use(renderPage());

// Handle all errors
app.use(errorHandler());

const port = PORT || 3000;
app.listen(port);

console.info(`Listening on http://localhost:${port}`);
