import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromDashboard from './modules/dashboard/dashboard.reducer';
import * as fromRouter from './modules/shared/routing/router.reducer';


export interface AppState {
  [fromRouter.routerFeatureKey]: fromRouter.State;
  [fromDashboard.dashboardFeatureKey]?: fromDashboard.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromRouter.routerFeatureKey]: fromRouter.reducer,
};
// https://ngrx.io/guide/store/metareducers
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
