import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, mergeMap, tap } from 'rxjs/operators';

import * as AuthorizationActions from './authorization.actions';
import { AuthorizationService } from '../../api/services/authorization.service';
import { RoutingService } from '../shared/routing/routing.service';
import * as ErrorResponseActions from '../../api/http-interceptors/error-response/error-response.actions';
import { catchApiError } from '../../api/api.actions';


@Injectable()
export class AuthorizationEffects {

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signUp),
    mergeMap(({ username, password }) => this.authorizationService.signUp({ username, password }).pipe(
      map((response) => AuthorizationActions.signUpSuccess({ authorizationToken: response.token })),
      catchApiError(AuthorizationActions.signUpError)
    ))
    )
  );

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signIn),
    mergeMap(({ username, password }) => this.authorizationService.signIn({ username, password }).pipe(
      map((response) => AuthorizationActions.signInSuccess({ authorizationToken: response.token })),
      catchApiError(AuthorizationActions.signInError)
    ))
  ));

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signOut),
    mergeMap(() => this.authorizationService.signOut().pipe(
      map(() => AuthorizationActions.signOutSuccess()),
      catchApiError(AuthorizationActions.signOutError)
    ))
  ));

  redirectOnSignOut$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthorizationActions.signOutSuccess,
      ErrorResponseActions.unauthorized,
    ),
    tap(() => this.routingService.navigation.landingPage.go())
    ),
    { dispatch: false }
  );

  redirectOnSignIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.signInSuccess),
    tap(() => this.routingService.navigation.dashboard.go())
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions,
              private authorizationService: AuthorizationService,
              private routingService: RoutingService,
  ) {}

}
