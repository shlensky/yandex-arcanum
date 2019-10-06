import { match } from 'react-router';
import { Routes } from 'routes';

export interface RouterParams {
    id: string;
    repositoryId: string;
    commitHash: string;
    path?: string;
}

export interface RouterEvent extends match<RouterParams> {
    route: Routes;
}

export type RouterState = RouterEvent | undefined | null;
