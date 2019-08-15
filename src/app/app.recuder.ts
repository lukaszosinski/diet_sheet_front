import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromDashboard from './modules/dashboard/dashboard.reducer';
import * as fromRouter from './modules/shared/routing/router.reducer';
import * as fromAuthorization from './modules/authorization/authorization.reducer';


export interface AppState {
  [fromRouter.routerFeatureKey]: fromRouter.State;
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.State;
  [fromDashboard.dashboardFeatureKey]?: fromDashboard.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromRouter.routerFeatureKey]: fromRouter.reducer,
  [fromAuthorization.authorizationFeatureKey]: fromAuthorization.reducer,
};
// https://ngrx.io/guide/store/metareducers
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
