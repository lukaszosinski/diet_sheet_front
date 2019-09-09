import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';
import * as fromApp from '../../app.recuder';
import { dashboardFeatureKey } from '../dashboard/dashboard.reducer';
import { UserPreferences } from './models/user-preferences.model';
import { DietLimits } from './models/diet-limits.model';
import { UserData } from './models/user-data.model';

export const settingsFeatureKey = 'settings';

export interface State {
  userPreferences?: UserPreferences;
  dietLimits?: DietLimits;
  userData?: UserData;
}

export const initialState: State = {};

const settingsReducer = createReducer(
  initialState,

  on(SettingsActions.loadSettings, state => state),
);

export function reducer(state: State | undefined, action: Action): State {
  return settingsReducer(state, action);
}


export const selectSettings = createFeatureSelector<fromApp.AppState, State>(dashboardFeatureKey);
