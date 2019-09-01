import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchApiError } from '../../../../api/api.actions';
import { MealService } from '../../../../api/services/meal.service';
import * as MealActions from './meal.actions';


@Injectable()
export class MealEffects {

  loadMeal$ = createEffect(() => this.actions$.pipe(
    ofType(MealActions.loadMeal),
    mergeMap(({ id }) => this.mealService.getMeal(id).pipe(
      map((meal) => MealActions.loadMealsSuccess({ meals: [ meal ] })),
      catchApiError(MealActions.loadMealsError)
    ))
  ));

  loadMeals$ = createEffect(() => this.actions$.pipe(
    ofType(MealActions.loadMeals),
    mergeMap(() => this.mealService.getMeals().pipe(
      map((meals) => MealActions.loadMealsSuccess({ meals })),
      catchApiError(MealActions.loadMealsError)
    ))
  ));

  addMeal = createEffect(() => this.actions$.pipe(
    ofType(MealActions.addMeal),
    mergeMap((action) => this.mealService.addMeal(action.meal).pipe(
      map((meal) => MealActions.upsertMealSuccess({ meal })),
      catchApiError(MealActions.upsertMealError)
    ))
  ));

  updateMeal = createEffect(() => this.actions$.pipe(
    ofType(MealActions.updateMeal),
    mergeMap(({ meal }) => this.mealService.updateMeal(meal).pipe(
      mergeMap(() => this.mealService.getMeal(String(meal.id))),
      // TODO remove when api starts returning meal in the response
      map((receivedMeal) => MealActions.upsertMealSuccess({ meal: receivedMeal })),
      catchApiError(MealActions.upsertMealError)
    ))
  ));

  constructor(private actions$: Actions,
              private mealService: MealService,
  ) {
  }

}
