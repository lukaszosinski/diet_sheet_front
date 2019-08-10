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
  on(AuthorizationActions.signUpSuccess, (state, { authorizationToken }) => ({ ...state, authorizationToken })),
  on(AuthorizationActions.signInSuccess, (state, { authorizationToken }) => ({ ...state, authorizationToken })),
  on(AuthorizationActions.signOutSuccess, state => ({ ...state, authorizationToken: undefined })),
);

export function reducer(state: State | undefined, action: Action) {
  return authorizationReducer(state, action);
}
