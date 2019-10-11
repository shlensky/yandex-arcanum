import express from 'express';
import { prepareState } from 'server/middleware/prepareState';
import { expect } from 'chai';
import { mockResponse } from './utils';

describe('Middleware: prepareState', () => {
    it('Отдает статус 404 если запрашиваемый URL не найден', async () => {
        const handler = prepareState();

        const req = ({ url: '/non-existing/path' } as unknown) as express.Request;
        const res = mockResponse();

        await handler(req, res, () => {});

        expect(res.status).to.have.been.calledWith(404);
    });
});
