import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, mergeMap, tap } from 'rxjs/operators';
import { DaysService } from '../../../../api/services/days.service';
import { catchApiError } from '../../../../api/api.actions';
import * as DayPlanActions from './day-plan.actions';
import * as fromDay from './day-plan.actions';


@Injectable()
export class DayPlanEffects {


  loadDay$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.loadDay),
    tap(console.log),
    mergeMap(({ date }) => this.daysService.getDay(date).pipe(
      map(day => fromDay.loadDaySuccess({ day })),
      catchApiError(fromDay.loadDayError)
    ))
  ));


  constructor(private actions$: Actions,
              private daysService: DaysService,
  ) {}

}
