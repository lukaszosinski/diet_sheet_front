import { createAction, props } from '@ngrx/store';
import { Day } from '../../../../api/models/day';
import { createApiErrorAction } from '../../../../api/api.actions';

export const loadDay = createAction('[DayPlan] Load Day', props<{ date: Date }>());
export const loadDaySuccess = createAction('[DayPlan/API] Load Day SUCCESS', props<{ day: Day }>());
export const loadDayError = createApiErrorAction('[DayPlan/API] Load Day ERROR', 'o chuj');
