import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, mergeMap } from 'rxjs/operators';

import * as AuthorizationActions from './authorization.actions';
import { AuthorizationService } from '../../api/services/authorization.service';
import { NgrxUtils } from '../shared/utils/ngrx-utils';


@Injectable()
export class AuthorizationEffects {

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signUp),
    mergeMap(({ username, password }) => this.authorizationService.signUp({ username, password }).pipe(
      map((response) => AuthorizationActions.signUpSuccess({ authorizationToken: response.token })),
      NgrxUtils.catchApiError(AuthorizationActions.signUpError)
    ))
    )
  );

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signIn),
    mergeMap(({ username, password }) => this.authorizationService.signIn({ username, password }).pipe(
      map((response) => AuthorizationActions.signInSuccess({ authorizationToken: response.token })),
      NgrxUtils.catchApiError(AuthorizationActions.signInError)
    ))
  ));

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signOut),
    mergeMap(() => this.authorizationService.signOut().pipe(
      map(() => AuthorizationActions.signOutSuccess()),
      NgrxUtils.catchApiError(AuthorizationActions.signOutError)
    ))
  ));

  constructor(private actions$: Actions,
              private authorizationService: AuthorizationService,
  ) {}

}
