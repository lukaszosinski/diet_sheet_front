import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { catchApiError } from '../../../../api/api.actions';
import { MealService } from '../../../../api/services/meal.service';
import * as MealActions from './meal.actions';


@Injectable()
export class MealEffects {

  loadMeals$ = createEffect(() => this.actions$.pipe(
    tap(console.log),
    ofType(MealActions.loadMeals),
    mergeMap(() => this.mealService.getMeals().pipe(
      map((meals) => MealActions.loadMealsSuccess({ meals })),
      catchApiError(MealActions.loadMealsError)
    ))
  ));

  constructor(private actions$: Actions,
              private mealService: MealService,
  ) {
  }

}
