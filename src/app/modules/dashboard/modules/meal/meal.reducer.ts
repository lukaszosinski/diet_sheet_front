import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Meal } from './meal.model';
import * as MealActions from './meal.actions';
import * as fromApp from '../../../../app.recuder';

export const mealsFeatureKey = 'meals';

export interface State extends EntityState<Meal> {
  processing: {
    loadMeals: boolean;
    addMeal: boolean;
  };
}

export const adapter: EntityAdapter<Meal> = createEntityAdapter<Meal>();

export const initialState: State = adapter.getInitialState({
  processing: {
    loadMeals: false,
    addMeal: false,
  }
});

const mealReducer = createReducer(
  initialState,
  on(MealActions.addMeal,
    (state) => ({ ...state, processing: { ...state.processing, addMeal: true } })
  ),
  on(MealActions.upsertMealError,
    (state) => ({ ...state, processing: { ...state.processing, addMeal: false } })
  ),
  on(MealActions.upsertMealSuccess,
    (state, { meal }) => ({ ...adapter.upsertOne(meal, state), processing: { ...state.processing, addMeal: false } })
  ),
  on(MealActions.upsertMeal,
    (state, action) => adapter.upsertOne(action.meal, state)
  ),
  on(MealActions.addMeals,
    (state, action) => adapter.addMany(action.meals, state)
  ),
  on(MealActions.upsertMeals,
    (state, action) => adapter.upsertMany(action.meals, state)
  ),
  on(MealActions.updateMeals,
    (state, action) => adapter.updateMany(action.meals, state)
  ),
  on(MealActions.deleteMeal,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MealActions.deleteMeals,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(
    MealActions.loadMeal,
    MealActions.loadMeals,
    (state) => ({ ...state, processing: { ...state.processing, loadMeals: true } })
  ),
  on(MealActions.loadMealsError,
    (state) => ({ ...state, processing: { ...state.processing, loadMeals: false } })
  ),
  on(MealActions.loadMealsSuccess,
    (state, action) => ({ ...adapter.upsertMany(action.meals, state), processing: { ...state.processing, loadMeals: false } })
  ),
  on(MealActions.clearMeals,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return mealReducer(state, action);
}

export const selectMeal = createFeatureSelector<fromApp.AppState, State>(mealsFeatureKey);

export const selectAll = createSelector(
  selectMeal,
  adapter.getSelectors().selectAll
);

export const selectEntities = createSelector(
  selectMeal,
  adapter.getSelectors().selectEntities
);

export const selectMealById = (mealId: string) => createSelector(
  selectEntities,
  (entities) => entities[mealId]
);

