import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthorizationActions from './authorization.actions';
import { ApiError } from '../../api/models/api-error.model';
import { AuthorizationService } from '../../api/services/authorization.service';


@Injectable()
export class AuthorizationEffects {

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signUp),
    mergeMap(({ username, password }) => this.authorizationService.signUp({ username, password }).pipe(
      map((response) => AuthorizationActions.signUpSuccess({ authorizationToken: response.token })),
      catchError((apiError: ApiError) => of(AuthorizationActions.signUpError(apiError)))
    ))
  ));

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signIn),
    mergeMap(({ username, password }) => this.authorizationService.signIn({ username, password }).pipe(
      map((response) => AuthorizationActions.signInSuccess({ authorizationToken: response.token })),
      catchError((apiError: ApiError) => of(AuthorizationActions.signInError(apiError)))
    ))
  ));

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signOut),
    mergeMap(() => this.authorizationService.signOut().pipe(
      map(() => AuthorizationActions.signOutSuccess()),
      catchError((apiError: ApiError) => of(AuthorizationActions.signOutError(apiError)))
    ))
  ));

  constructor(private actions$: Actions,
              private authorizationService: AuthorizationService,
  ) {}

}
