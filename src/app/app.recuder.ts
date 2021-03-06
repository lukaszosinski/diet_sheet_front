import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromDashboard from './modules/dashboard/dashboard.reducer';
import * as fromAuthorization from './modules/authorization/authorization.reducer';
import * as fromDayPlan from './modules/dashboard/modules/day-plan/day-plan.reducer';
import * as fromMeal from './modules/dashboard/modules/meal/meal.reducer';
import * as fromProduct from './modules/dashboard/modules/product/product.reducer';
import * as fromShoppingList from './modules/dashboard/modules/shopping-list/shopping-list.reducer';
import * as fromSettings from './modules/settings/settings.reducer';
import { InjectionToken } from '@angular/core';


export interface AppState {
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.State;
  [fromDashboard.dashboardFeatureKey]?: fromDashboard.State;
  [fromDayPlan.dayPlanFeatureKey]?: fromDayPlan.State;
  [fromMeal.mealsFeatureKey]?: fromMeal.State;
  [fromProduct.productsFeatureKey]?: fromProduct.State;
  [fromShoppingList.shoppingListFeatureKey]?: fromShoppingList.State;
  [fromSettings.settingsFeatureKey]?: fromSettings.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.reducer,
};
export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('App Reducers');
export const reducerProvider = { provide: REDUCERS_TOKEN, useValue: reducers };
// https://ngrx.io/guide/store/metareducers
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
