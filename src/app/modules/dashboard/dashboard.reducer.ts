import * as DashboardActions from './dashboard.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  shouldShowNavBar?: boolean;
}

const initialState: DashboardState = {
  shouldShowNavBar: true,
};

const dashboardReducer = createReducer(initialState,
  on(DashboardActions.triggerNavBar, (state) => ({ ...state, shouldShowNavBar: !state.shouldShowNavBar }))
);

export function reducer(state: DashboardState | undefined, action: Action) {
  return dashboardReducer(state, action);
}
