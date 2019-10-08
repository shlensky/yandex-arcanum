import { ReposState, ReposActions, SET_REPOS } from 'store/repos/types';

export function reposReducer(state: ReposState = [], action: ReposActions): ReposState {
    switch (action.type) {
        case SET_REPOS:
            return action.payload;
        default:
            return state;
    }
}
