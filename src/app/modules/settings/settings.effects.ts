import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as SettingsActions from './settings.actions';


@Injectable()
export class SettingsEffects {


  loadSettings$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadSettings),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  ));


  constructor(private actions$: Actions) {}

}
