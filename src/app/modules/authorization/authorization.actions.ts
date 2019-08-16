import { createAction, props } from '@ngrx/store';
import { createApiErrorAction } from '../../api/api.actions';


export const signUp = createAction('[Authorization] Sign up', props<{ username: string, password: string }>());

export const signUpSuccess = createAction('[Authorization/API] Sign up SUCCESS', props<{ authorizationToken: string }>());

export const signUpError = createApiErrorAction('[Authorization/API] Sign up ERROR', 'AUTHORIZATION.SIGN_UP_ERROR');

export const signIn = createAction('[Authorization] Sign in', props<{ username: string, password: string }>());

export const signInSuccess = createAction('[Authorization/API] Sign in SUCCESS', props<{ authorizationToken: string }>());

export const signInError = createApiErrorAction('[Authorization/API] Sign in ERROR', 'AUTHORIZATION.SIGN_IN_ERROR');

export const signOut = createAction('[Authorization] Sign out');

export const signOutSuccess = createAction('[Authorization/API] Sign out SUCCESS');

export const signOutError = createApiErrorAction('[Authorization/API] Sign out ERROR', 'AUTHORIZATION.SIGN_OUT_ERROR');
