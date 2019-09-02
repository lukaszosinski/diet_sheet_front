import { createAction, props } from '@ngrx/store';
import { Meal } from './meal.model';
import { createApiErrorAction } from '../../../../api/api.actions';

export const loadMeal = createAction('[Meal/API] Load Meal', props<{ id: string }>());

export const loadMeals = createAction('[Meal/API] Load Meals');

export const loadMealsSuccess = createAction('[Meal/API] Load Meals SUCCESS', props<{ meals: Meal[] }>());

export const loadMealsError = createApiErrorAction('[Meal/API] Load Meals ERROR', 'MEAL.LOAD_ERROR');

export const addMealAndRedirect = createAction('[Meal/API] Add Meal and redirect on success', props<{ meal: Meal }>());

export const updateMealAndRedirect = createAction('[Meal/API] Update Meal and redirect on success', props<{ meal: Meal }>());

export const upsertMealSuccess = createAction('[Meal/API] Upsert Meal Success', props<{ meal: Meal }>());

export const upsertMealError = createApiErrorAction('[Meal/API] Upsert Meal Error', 'MEAL.UPSERT_ERROR');

export const redirectFromMealDetails = createAction('[Meal] Redirect from meal details view', props<{ createdMealId?: number }>());

export const redirectToMealDetails = createAction(
  '[Meal] Redirect to Meal details view',
  props<{ id?: number, skipLocationChange?: boolean, redirectUrl?: string }>()
);

export const clearStoredMeal = createAction('[Meal] Clear stored Meal');

export const deleteMeal = createAction('[Meal] Delete Meal', props<{ id: string }>());
