import { Request, Response, ErrorRequestHandler } from 'express';

export function errorHandler(): ErrorRequestHandler {
    return async function(err: Error, req: Request, res: Response) {
        if (!res.headersSent) {
            res.status(500);
        }

        if (process.env.NODE_ENV === 'production') {
            res.json({});
        } else {
            res.json({ message: err.message, stack: err.stack });
        }
    };
}
