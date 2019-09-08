import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Meal } from './meal.model';
import * as MealActions from './meal.actions';
import * as fromApp from '../../../../app.recuder';

export const mealsFeatureKey = 'meals';

export interface State extends EntityState<Meal> {
  processing: {
    loadMeals: boolean;
    upsertMeal: boolean;
  };
  shouldStoreMeal: boolean;
  storedMeal?: Meal;
}

export const adapter: EntityAdapter<Meal> = createEntityAdapter<Meal>();

export const initialState: State = adapter.getInitialState({
  processing: {
    loadMeals: false,
    upsertMeal: false,
  },
  shouldStoreMeal: false,
  storedMeal: undefined,
});

const mealReducer = createReducer(
  initialState,
  on(
    MealActions.addMealAndRedirect,
    MealActions.updateMealAndRedirect,
    (state) => ({ ...state, processing: { ...state.processing, upsertMeal: true } })
  ),
  on(MealActions.upsertMealError,
    (state) => ({ ...state, processing: { ...state.processing, upsertMeal: false } })
  ),
  on(MealActions.upsertMealSuccess,
    (state, { meal }) => {
      const withUpsertedMeal = adapter.upsertOne(meal, state);
      return {
        ...withUpsertedMeal,
        storedMeal: state.shouldStoreMeal ? withUpsertedMeal.entities[meal.id] : undefined,
        processing: { ...state.processing, upsertMeal: false }
      };
    }
  ),
  on(MealActions.clearStoredMeal,
    (state) => ({ ...state, storedMeal: undefined })
  ),
  on(MealActions.requestMealStore,
    (state) => ({ ...state, shouldStoreMeal: true })
  ),
  on(MealActions.cancelMealStoreRequest,
    (state) => ({ ...state, shouldStoreMeal: false })
  ),
  on(MealActions.deleteMeal,
    (state, action) => adapter.removeOne(action.id, state)
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
  on(MealActions.redirectToMealDetails, (state, { id }) => ({ ...state, selectedMealId: id })),
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

export const selectStoredMeal = createSelector(
  selectMeal,
  (state) => state.storedMeal
);
