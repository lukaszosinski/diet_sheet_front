import { createAction, props } from '@ngrx/store';
import { createApiErrorAction } from '../../api/api.actions';
import { DietLimits } from './models/diet-limits.model';
import { UserPreferences } from './models/user-preferences.model';
import { UserData } from './models/user-data.model';

export const loadDietLimits = createAction('[Settings/API] Load diet limits');

export const loadDietLimitsSuccess = createAction('[Settings/API] Load diet limits SUCCESS', props<{ dietLimits: DietLimits }>());

export const loadDietLimitsError = createApiErrorAction('[Settings/API] Load diet limits ERROR', 'SETTINGS.LOAD_DIET_LIMITS_ERROR');

export const dietLimitsNotFound = createAction('[Settings/API] Diet limits not fount');


export const loadPreferences = createAction('[Settings/API] Load preferences');

export const loadPreferencesSuccess = createAction('[Settings/API] Load preferences SUCCESS', props<{ preferences: UserPreferences }>());

export const loadPreferencesError = createApiErrorAction('[Settings/API] Load preferences ERROR', 'SETTINGS.LOAD_PREFERENCES_ERROR');


export const loadUserData = createAction('[Settings/API] Load user data');

export const loadUserDataSuccess = createAction('[Settings/API] Load user data SUCCESS', props<{ userData: UserData }>());

export const loadUserDataError = createApiErrorAction('[Settings/API] Load user data ERROR', 'SETTINGS.LOAD_USER_DATA_ERROR');





