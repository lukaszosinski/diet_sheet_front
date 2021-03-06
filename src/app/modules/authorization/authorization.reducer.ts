import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AuthorizationActions from './authorization.actions';
import * as fromApp from '../../app.recuder';
import * as ErrorResponseActions from '../../api/http-interceptors/error-response/error-response.actions';

export const authorizationFeatureKey = 'authorization';

export interface State {
  authorizationToken?: string;
  processing: {
    signIn: boolean,
    signUp: boolean,
    signOut: boolean,
  };
}

const authorizationTokenStorageKey = 'authorization';

export const initialState: State = {
  authorizationToken: localStorage.getItem(authorizationTokenStorageKey) || undefined,
  processing: {
    signIn: false,
    signUp: false,
    signOut: false,
  }
};

const authorizationReducer = createReducer(
  initialState,
  on(AuthorizationActions.signInSuccess,
    (state, { authorizationToken }) => {
      localStorage.setItem(authorizationTokenStorageKey, authorizationToken);
      return { ...state, authorizationToken, processing: { ...state.processing, signIn: false } };
    }),
  on(AuthorizationActions.signUpSuccess,
    (state, { authorizationToken }) => {
      localStorage.setItem(authorizationTokenStorageKey, authorizationToken);
      return { ...state, authorizationToken, processing: { ...state.processing, signUp: false } };
    }),
  on(AuthorizationActions.signOutSuccess,
    state => {
      localStorage.removeItem(authorizationTokenStorageKey);
      return { ...state, authorizationToken: undefined, processing: { ...state.processing, signOut: false } };
    }
  ),
  on(AuthorizationActions.signIn, state => ({ ...state, processing: { ...state.processing, signIn: true } })),
  on(AuthorizationActions.signUp, state => ({ ...state, processing: { ...state.processing, signUp: true } })),
  on(AuthorizationActions.signOut, state => ({ ...state, processing: { ...state.processing, signOut: true } })),
  on(AuthorizationActions.signInError,
    state => ({ ...state, processing: { ...state.processing, signIn: false } })
  ),
  on(AuthorizationActions.signUpError,
    state => ({ ...state, processing: { ...state.processing, signUp: false } })
  ),
  on(AuthorizationActions.signOutError,
    state => {
      localStorage.removeItem(authorizationTokenStorageKey);
      return { ...state, authorizationToken: undefined, processing: { ...state.processing, signOut: false } };
    }
  ),
  on(ErrorResponseActions.unauthorized,
    state => {
      localStorage.removeItem(authorizationTokenStorageKey);
      return { ...state, authorizationToken: undefined };
    }
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return authorizationReducer(state, action);
}

export const selectAuthorization = createFeatureSelector<fromApp.AppState, State>(authorizationFeatureKey);
export const selectAuthorizationToken = createSelector(
  selectAuthorization,
  (state: State) => state.authorizationToken
);
export const isAuthorized = createSelector(
  selectAuthorization,
  (state: State) => state.authorizationToken !== undefined
);
