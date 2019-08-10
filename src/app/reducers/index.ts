import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromDashboard from '../modules/dashboard/dashboard.reducer';

export interface AppState {
  [fromDashboard.dashboardFeatureKey]?: fromDashboard.DashboardState;
}

export const reducers: ActionReducerMap<AppState> = {};
// https://ngrx.io/guide/store/metareducers
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
