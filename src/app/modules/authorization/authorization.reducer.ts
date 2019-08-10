import { Action, createReducer, on } from '@ngrx/store';
import * as AuthorizationActions from './authorization.actions';

export const authorizationFeatureKey = 'authorization';

export interface State {
  authorizationToken?: string;
}

const authorizationTokenStorageKey = 'authorization';

function getAuthorizationTokenFromStorage(): string | undefined {
  return localStorage.getItem(authorizationTokenStorageKey) || undefined;
}

export const initialState: State = {
  authorizationToken: getAuthorizationTokenFromStorage(),
};

const authorizationReducer = createReducer(
  initialState,
  on(AuthorizationActions.sinUp, state => state),
  on(AuthorizationActions.sinIn, state => state),
  on(AuthorizationActions.sinOut, state => state),
);

export function reducer(state: State | undefined, action: Action) {
  return authorizationReducer(state, action);
}
