import { Request, Response, NextFunction, Handler } from 'express';

import { getTreeState } from 'server/dataSource/tree';
import { getBlobState } from 'server/dataSource/blob';

export function treeApi(): Handler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await getTreeState());
        } catch (err) {
            next(err);
        }
    };
}

export function blobApi(): Handler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await getBlobState(req.params.id));
        } catch (err) {
            next(err);
        }
    };
}
