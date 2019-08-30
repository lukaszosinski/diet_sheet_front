import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { DaysService } from '../../../../api/services/days.service';
import { catchApiError } from '../../../../api/api.actions';
import { AppState } from '../../../../app.recuder';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import * as fromDayPlan from './day-plan.reducer';
import * as DayPlanActions from './day-plan.actions';


@Injectable()
export class DayPlanEffects {

  loadDays$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.loadDays),
    debounceTime(200),
    mergeMap(({ fromDate, toDate }) => this.daysService.getDaysInRange(fromDate, toDate).pipe(
      map(days => DayPlanActions.loadDaysSuccess({ days })),
      catchApiError(DayPlanActions.loadDaysError)
    ))
  ));

  updateSelectedDayDayMeal$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.updateSelectedDayDayMeal),
    withLatestFrom(this.store.select(fromDayPlan.selectSelectedDay)),
    mergeMap(([ action, selectedDay ]) => {
      if (!!selectedDay) {
        const updatedDayMeals = selectedDay.dayMeals.map(d => d.id === action.dayMeal.id ? action.dayMeal : d);
        selectedDay = { ...selectedDay, dayMeals: updatedDayMeals };
        return this.daysService.putDay(selectedDay).pipe(
          map(day => DayPlanActions.upsertDaySuccess({ day })),
          catchApiError(DayPlanActions.upsertDayError)
        );
      }
      console.error(`Action of type ${action.type} can not be called when selectedDay does not exist.`);
      return EMPTY;
    })
  ));

  deleteSelectedDayDayMeal$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.deleteSelectedDayDayMeal),
    withLatestFrom(this.store.select(fromDayPlan.selectSelectedDay)),
    mergeMap(([ action, selectedDay ]) => {
      if (!!selectedDay) {
        const updatedDayMeals = selectedDay.dayMeals.filter(d => d.id !== action.dayMeal.id);
        selectedDay = { ...selectedDay, dayMeals: updatedDayMeals };
        return this.daysService.putDay(selectedDay).pipe(
          map(day => DayPlanActions.upsertDaySuccess({ day })),
          catchApiError(DayPlanActions.upsertDayError)
        );
      }
      console.error(`Action of type ${action.type} can not be called when selectedDay does not exist.`);
      return EMPTY;
    })
  ));

  updateDay = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.updateDay),
    mergeMap(({ day }) => {
      return this.daysService.putDay(day).pipe(
        map(dayResp => DayPlanActions.upsertDaySuccess({ day: dayResp })),
        catchApiError(DayPlanActions.upsertDayError)
      );
    })
  ));

  createDay = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.createDay),
    mergeMap(({ day }) => {
      return this.daysService.createDay(day).pipe(
        map(dayResp => DayPlanActions.upsertDaySuccess({ day: dayResp })),
        catchApiError(DayPlanActions.upsertDayError)
      );
    })
  ));

  constructor(private actions$: Actions,
              private daysService: DaysService,
              private store: Store<AppState>
  ) {}

}
