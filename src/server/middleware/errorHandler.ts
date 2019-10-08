import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export function errorHandler(): ErrorRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async function(err: Error, req: Request, res: Response, next: NextFunction) {
        if (!res.headersSent) {
            res.status(500);
        }

        if (process.env.NODE_ENV === 'production') {
            console.error(err);
            res.json({});
        } else {
            res.json({ message: err.message, stack: err.stack });
        }
    };
}
