import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as AuthorizationActions from './authorization.actions';


@Injectable()
export class AuthorizationEffects {

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.sinUp),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  ));

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.sinIn),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  ));

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorizationActions.sinOut),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  ));

  constructor(private actions$: Actions) {}

}
