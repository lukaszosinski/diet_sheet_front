import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';
import * as fromApp from '../../app.recuder';
import { UserPreferences } from './models/user-preferences.model';
import { DietLimits } from './models/diet-limits.model';
import { UserData } from './models/user-data.model';

export const settingsFeatureKey = 'settings';

export interface State {
  preferences?: UserPreferences;
  dietLimits?: DietLimits;
  userData?: UserData;
  processing: {
    loadUserPreferences: boolean;
    loadDietLimits: boolean;
    loadUserData: boolean;
    updateUserData: boolean;
    updatePreferences: boolean;
    updateDietLimits: boolean;
  };
}

export const initialState: State = {
  processing: {
    loadUserPreferences: false,
    loadDietLimits: false,
    loadUserData: false,
    updateUserData: false,
    updatePreferences: false,
    updateDietLimits: false,
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

  on(SettingsActions.loadPreferences, state => ({ ...state, processing: { ...state.processing, loadPreferences: true } })),
  on(SettingsActions.loadPreferencesSuccess, (state, { preferences }) => ({
    ...state,
    preferences,
    processing: { ...state.processing, loadPreferences: false }
  })),
  on(SettingsActions.loadPreferencesError, state => ({ ...state, processing: { ...state.processing, loadPreferences: false } })),

  on(SettingsActions.loadUserData, state => ({ ...state, processing: { ...state.processing, loadUserData: true } })),
  on(SettingsActions.loadUserDataSuccess, (state, { userData }) => ({
    ...state,
    userData,
    processing: { ...state.processing, loadUserData: false }
  })),
  on(SettingsActions.loadUserDataError, state => ({ ...state, processing: { ...state.processing, loadUserData: false } })),

  on(SettingsActions.updatePreferencesAndUserData, state => ({
    ...state,
    processing: { ...state.processing, updateUserData: true, updatePreferences: true }
  })),
  on(SettingsActions.updateUserData, state => ({
    ...state,
    processing: { ...state.processing, updateUserData: true }
  })),
  on(SettingsActions.updatePreferencesAndUserDataError, state => ({
    ...state,
    processing: { ...state.processing, updateUserData: false, updatePreferences: false }
  })),

  on(SettingsActions.updateUserDataSuccess, (state, { userData }) => ({
    ...state,
    userData,
    processing: { ...state.processing, updateUserData: false }
  })),
  on(SettingsActions.updatePreferencesSuccess, (state, { preferences }) => ({
    ...state,
    preferences,
    processing: { ...state.processing, updatePreferences: false }
  })),

  on(SettingsActions.updateSettings, (state) => ({
    ...state,
    processing: { ...state.processing, updateDietLimits: true, updateUserData: true, updatePreferences: true }
  })),
  on(SettingsActions.updateDietLimitsSuccess, (state, { dietLimits }) => ({
    ...state,
    dietLimits,
    processing: { ...state.processing, updateDietLimits: false }
  })),
  on(SettingsActions.updateDietLimitsError, (state) => ({ ...state, processing: { ...state.processing, updateDietLimits: false } })),
);

export function reducer(state: State | undefined, action: Action): State {
  return settingsReducer(state, action);
}

export const selectSettings = createFeatureSelector<fromApp.AppState, State>(settingsFeatureKey);

export const selectDietLimits = createSelector(
  selectSettings,
  (state: State) => state.dietLimits
);

export const selectUserData = createSelector(
  selectSettings,
  (state: State) => state.userData
);

export const selectUserPreferences = createSelector(
  selectSettings,
  (state: State) => state.preferences
);
