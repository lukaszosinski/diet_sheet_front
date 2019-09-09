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
  processing: {
    loadUserPreferences: boolean;
    loadDietLimits: boolean;
    loadUserData: boolean;
  };
}

export const initialState: State = {
  processing: {
    loadUserPreferences: false,
    loadDietLimits: false,
    loadUserData: false,
  }
};

const settingsReducer = createReducer(
  initialState,

  on(SettingsActions.loadDietLimits, state => ({ ...state, processing: { ...state.processing, loadDietLimits: true } })),
  on(SettingsActions.loadDietLimitsSuccess, (state, { dietLimits }) => ({
    ...state,
    dietLimits,
    processing: { ...state.processing, loadDietLimits: false }
  })),
  on(SettingsActions.loadDietLimitsError, state => ({ ...state, processing: { ...state.processing, loadDietLimits: false } })),
);

export function reducer(state: State | undefined, action: Action): State {
  return settingsReducer(state, action);
}


export const selectSettings = createFeatureSelector<fromApp.AppState, State>(dashboardFeatureKey);
