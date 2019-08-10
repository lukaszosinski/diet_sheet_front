import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import * as fromApp from '../../reducers';


export const dashboardFeatureKey = 'dashboard';

export interface State {
  shouldShowNavBar: boolean;
}

export const initialState: State = {
  shouldShowNavBar: true,
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.triggerNavBar, (state) => ({ ...state, shouldShowNavBar: !state.shouldShowNavBar }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}

export const selectDashboard = createFeatureSelector<fromApp.AppState, State>(dashboardFeatureKey);

export const selectShouldShowNavBar = createSelector(
  selectDashboard,
  (state: State) => state.shouldShowNavBar
);
