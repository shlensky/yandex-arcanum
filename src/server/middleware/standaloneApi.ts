import { Request, Response, NextFunction, Handler } from 'express';
import { resolve } from 'path';

import { REPOS_DIR } from 'env';
import { getBlob } from 'server/lib/git';

export function blobApi(): Handler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            const { repositoryId, commitHash, path } = req.params;

            const repositoryPath = resolve(REPOS_DIR, repositoryId);
            const stream = getBlob(repositoryPath, commitHash, path);

            stream.stdout.on('data', res.write.bind(res));
            stream.stderr.on('data', chunk => console.error(chunk.toString()));
            stream.on('exit', code => {
                if (code !== 0) {
                    res.status(500);
                }

                res.end();
            });
        } catch (e) {
            next(e);
        }
    };
}
