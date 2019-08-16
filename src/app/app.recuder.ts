import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromDashboard from './modules/dashboard/dashboard.reducer';
import * as fromRouter from './modules/shared/routing/router.reducer';
import * as fromAuthorization from './modules/authorization/authorization.reducer';
import * as fromDayPlan from './modules/dashboard/modules/day-plan/day-plan.reducer';


export interface AppState {
  [fromRouter.routerFeatureKey]: fromRouter.State;
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.State;
  [fromDashboard.dashboardFeatureKey]?: fromDashboard.State;
  [fromDayPlan.dayPlanFeatureKey]?: fromDayPlan.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromRouter.routerFeatureKey]: fromRouter.reducer,
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.reducer,
};
// https://ngrx.io/guide/store/metareducers
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
