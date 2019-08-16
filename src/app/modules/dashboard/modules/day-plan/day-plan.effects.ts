import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as DayPlanActions from './day-plan.actions';


@Injectable()
export class DayPlanEffects {


  loadDayPlans$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.loadDayPlans),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  ));


  constructor(private actions$: Actions) {}

}
