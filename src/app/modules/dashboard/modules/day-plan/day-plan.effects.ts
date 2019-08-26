import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { DaysService } from '../../../../api/services/days.service';
import { catchApiError } from '../../../../api/api.actions';
import * as DayPlanActions from './day-plan.actions';
import { AppState } from '../../../../app.recuder';
import * as fromDayPlan from './day-plan.reducer';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { DayMeal } from '../../../../api/models/day-meal.model';


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
    mergeMap(( [action, selectedDay] ) => {
      if (!!selectedDay) {
        const idToReplace = action.dayMeal.id;
        const updatedDayMeals = this.getModifiedCopyOfDayMeals(selectedDay.dayMeals, idToReplace, action.dayMeal);
        selectedDay = {...selectedDay, dayMeals: updatedDayMeals};
        return this.daysService.putDay(selectedDay).pipe(
          map(day => DayPlanActions.updateDaySuccess({ day })),
          catchApiError(DayPlanActions.updateDayError)
        );
      }
      console.error(`Action of type ${action.type} can not be called when selectedDay does not exist.`);
      return EMPTY;
    })
  ));

  deleteSelectedDayDayMeal$ = createEffect(() => this.actions$.pipe(
    ofType(DayPlanActions.deleteSelectedDayDayMeal),
    withLatestFrom(this.store.select(fromDayPlan.selectSelectedDay)),
    mergeMap(( [action, selectedDay] ) => {
      if (!!selectedDay) {
        const idToDelete = action.dayMeal.id;
        const modifiedDayMeals = this.getModifiedCopyOfDayMeals(selectedDay.dayMeals, idToDelete);
        selectedDay = {...selectedDay, dayMeals: modifiedDayMeals};
        return this.daysService.putDay(selectedDay).pipe(
          map(day => DayPlanActions.updateDaySuccess({ day })),
          catchApiError(DayPlanActions.updateDayError)
        );
      }
      console.error(`Action of type ${action.type} can not be called when selectedDay does not exist.`);
      return EMPTY;
    })
  ));

  private getModifiedCopyOfDayMeals(
      dayMeals: DayMeal[],
      idToModify: number,
      newDayMeal?: DayMeal
    ): DayMeal[] {
      const modifiedDayMeals = [...dayMeals];
      const indexToDelete = modifiedDayMeals.findIndex(dayMeal =>
        dayMeal.id === idToModify
      );
      if (indexToDelete === -1) {
        return modifiedDayMeals;
      }
      if (!!newDayMeal) {
        modifiedDayMeals.splice(indexToDelete, 1, newDayMeal);
      } else {
        modifiedDayMeals.splice(indexToDelete, 1);
      }
      return modifiedDayMeals;
  }

  constructor(private actions$: Actions,
              private daysService: DaysService,
              private store: Store<AppState>
  ) {}

}
