import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromDashboard from './modules/dashboard/dashboard.reducer';
import * as fromAuthorization from './modules/authorization/authorization.reducer';
import * as fromDayPlan from './modules/dashboard/modules/day-plan/day-plan.reducer';
import * as fromMeal from './modules/dashboard/modules/meal/meal.reducer';
import * as fromProduct from './modules/dashboard/modules/product/product.reducer';


export interface AppState {
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.State;
  [fromDashboard.dashboardFeatureKey]?: fromDashboard.State;
  [fromDayPlan.dayPlanFeatureKey]?: fromDayPlan.State;
  [fromMeal.mealsFeatureKey]?: fromMeal.State;
  [fromProduct.productsFeatureKey]?: fromProduct.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.reducer,
};
// https://ngrx.io/guide/store/metareducers
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
