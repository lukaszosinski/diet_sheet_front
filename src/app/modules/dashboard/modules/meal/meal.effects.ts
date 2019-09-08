import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { catchApiError } from '../../../../api/api.actions';
import { MealService } from '../../../../api/services/meal.service';
import { RoutingService } from '../../../shared/routing/routing.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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

  addMealAndRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(MealActions.addMealAndRedirect),
    mergeMap(({ meal }) => this.mealService.addMeal(meal).pipe(
      map((receivedMeal) => MealActions.upsertMealSuccess({ meal: receivedMeal })),
      tap(() => this.redirect()),
      catchApiError(MealActions.upsertMealError)
    ))
  ));

  updateMealAndRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(MealActions.updateMealAndRedirect),
    mergeMap(({ meal }) => this.mealService.updateMeal(meal).pipe(
      map((receivedMeal) => MealActions.upsertMealSuccess({ meal: receivedMeal })),
      tap(() => this.redirect()),
      catchApiError(MealActions.upsertMealError)
    ))
  ));

  redirectToMealDetails$ = createEffect(() => this.actions$.pipe(
    ofType(MealActions.redirectToMealDetails),
    tap(({ id, skipLocationChange, redirectUrl }) => this.goToMealDetails(id, skipLocationChange, redirectUrl))
  ), { dispatch: false });

  redirectFromMealDetails = createEffect(() => this.actions$.pipe(
    ofType(MealActions.redirectFromMealDetails),
    tap(() => this.redirect())
  ), { dispatch: false });

  constructor(private actions$: Actions,
              private mealService: MealService,
              private routingService: RoutingService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  private redirect(): Observable<boolean> {
    const { redirectUrl } = this.activatedRoute.snapshot.queryParams;
    const redirectPromise = redirectUrl
      ? this.routingService.navigateByUrl(redirectUrl)
      : this.routingService.navigation.dashboard.meals.list();
    return fromPromise(redirectPromise);
  }

  private goToMealDetails(id?: number, skipLocationChange?: boolean, redirectUrl?: string): void {
    this.routingService.navigation.dashboard.meals.details(id, skipLocationChange, redirectUrl);
  }
}
