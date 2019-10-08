import { Repo } from 'schema/Repo';
import { SET_REPOS, SetReposAction } from 'store/repos/types';

export function setRepos(repos: Repo[]): SetReposAction {
    return {
        type: SET_REPOS,
        payload: repos,
    };
}
