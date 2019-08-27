import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Meal } from './meal.model';
import { createApiErrorAction } from '../../../../api/api.actions';


export const loadMeals = createAction('[Meal/API] Load Meals');

export const loadMealsSuccess = createAction('[Meal/API] Load Meals SUCCESS', props<{ meals: Meal[] }>());

export const loadMealsError = createApiErrorAction('[Meal/API] Load Meals ERROR', 'MEALS.LOAD_ERROR');

export const addMeal = createAction('[Meal] Add Meal', props<{ meal: Meal }>());

export const upsertMeal = createAction('[Meal] Upsert Meal', props<{ meal: Meal }>());

export const addMeals = createAction('[Meal] Add Meals', props<{ meals: Meal[] }>());

export const upsertMeals = createAction('[Meal] Upsert Meals', props<{ meals: Meal[] }>());

export const updateMeal = createAction('[Meal] Update Meal', props<{ meal: Update<Meal> }>());

export const updateMeals = createAction('[Meal] Update Meals', props<{ meals: Update<Meal>[] }>());

export const deleteMeal = createAction('[Meal] Delete Meal', props<{ id: string }>());

export const deleteMeals = createAction('[Meal] Delete Meals', props<{ ids: string[] }>());

export const clearMeals = createAction('[Meal] Clear Meals');
