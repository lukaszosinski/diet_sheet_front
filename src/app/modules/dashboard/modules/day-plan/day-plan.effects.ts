import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { DaysService } from '../../../../api/services/days.service';
import { catchApiError } from '../../../../api/api.actions';
import * as DayPlanActions from './day-plan.actions';
import * as fromDay from './day-plan.actions';


@Injectable()
export class DayPlanEffects {

  loadDays$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.loadDays),
    debounceTime(200),
    mergeMap(({ fromDate, toDate }) => this.daysService.getDaysInRange(fromDate, toDate).pipe(
      map(days => fromDay.loadDaysSuccess({ days })),
      catchApiError(fromDay.loadDaysError)
    ))
  ));

  putDay$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.putDay),
    debounceTime(200),
    mergeMap(( {day} ) => this.daysService.putDay(day).pipe(
      map(day => fromDay.putDaySuccess({ day })),
      catchApiError(fromDay.putDayError)
    ))
  ));

  constructor(private actions$: Actions,
              private daysService: DaysService,

  ) {}

}
