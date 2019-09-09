import { createAction, props } from '@ngrx/store';
import { createApiErrorAction } from '../../api/api.actions';
import { DietLimits } from './models/diet-limits.model';

export const loadDietLimits = createAction('[Settings/API] Load diet limits');

export const loadDietLimitsSuccess = createAction('[Settings/API] Load diet limits SUCCESS', props<{ dietLimits: DietLimits }>());

export const loadDietLimitsError = createApiErrorAction('[Settings/API] Load diet limits ERROR', 'SETTINGS.LOAD_DIET_LIMITS_ERROR');

export const dietLimitsNotFound = createAction('[Settings/API] Diet limits not fount');




