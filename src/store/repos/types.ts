import { Repo } from 'schema/Repo';

export const SET_REPOS = 'SET_REPOS';

export interface SetReposAction {
    type: typeof SET_REPOS;
    payload: ReposState;
}

export type ReposState = Repo[];

export type ReposActions = SetReposAction;
