import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {debounceTime, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import { DaysService } from '../../../../api/services/days.service';
import { catchApiError } from '../../../../api/api.actions';
import * as DayPlanActions from './day-plan.actions';
import * as fromDay from './day-plan.actions';
import {AppState} from '../../../../app.recuder';
import * as fromDayPlan from './day-plan.reducer';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';


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

  updateSelectedDayDayMeal$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.updateSelectedDayDayMeal),
    debounceTime(200),
    withLatestFrom(this.store.select(fromDayPlan.selectSelectedDay)),
    mergeMap(( [action, selectedDay] ) => {
      if (!!selectedDay) {
        const dayMealToUpdate = action.dayMeal;
        const updatedDayMeals = [...selectedDay.dayMeals];
        const indexToUpdate = updatedDayMeals.findIndex(dayMeal =>
          dayMeal.id === dayMealToUpdate.id
        );
        updatedDayMeals.splice(indexToUpdate, 1, dayMealToUpdate);
        selectedDay = {...selectedDay, dayMeals: updatedDayMeals};
        return this.daysService.putDay(selectedDay).pipe(
          map(day => fromDay.putDaySuccess({ day })),
          catchApiError(fromDay.putDayError)
        );
      }
      // TODO Handle error when selectedDay is undefined
      return new Observable<Action>();
    })
  ));

  deleteSelectedDayDayMeal$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.deleteSelectedDayDayMeal),
    withLatestFrom(this.store.select(fromDayPlan.selectSelectedDay)),
    mergeMap(( [action, selectedDay] ) => {
      if (!!selectedDay) {
        const idToDelete = action.dayMeal.id;
        const updatedDayMeals = [...selectedDay.dayMeals];
        const indexToDelete = updatedDayMeals.findIndex(dayMeal =>
          dayMeal.id === idToDelete
        );
        updatedDayMeals.splice(indexToDelete, 1);
        selectedDay = {...selectedDay, dayMeals: updatedDayMeals};
        return this.daysService.putDay(selectedDay).pipe(
          map(day => fromDay.putDaySuccess({ day })),
          catchApiError(fromDay.putDayError)
        );
      }
      // TODO Handle error when selectedDay is undefined
      return new Observable<Action>();
    })
  ));

  constructor(private actions$: Actions,
              private daysService: DaysService,
              private store: Store<AppState>
  ) {}

}
