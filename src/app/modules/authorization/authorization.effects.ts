import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthorizationActions from './authorization.actions';
import { AuthorizationService } from '../../api/services/authorization.service';
import { ApiResponse } from '../../api/models/api-response.model';
import { ApiError } from '../../api/models/api-error.model';


@Injectable()
export class AuthorizationEffects {

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signUp),
    mergeMap(() => this.authorizationService.signUp().pipe(
      map((response: ApiResponse<string>) => AuthorizationActions.signUpSuccess({ authorizationToken: response.body })),
      catchError((apiError: ApiError) => of(AuthorizationActions.signUpError(apiError)))
    ))
  ));

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signIn),
    mergeMap(() => this.authorizationService.signIn().pipe(
      map((response: ApiResponse<string>) => AuthorizationActions.signInSuccess({ authorizationToken: response.body })),
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
