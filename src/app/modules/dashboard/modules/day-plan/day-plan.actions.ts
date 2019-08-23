import { createAction, props } from '@ngrx/store';
import { Day } from '../../../../api/models/day';
import { createApiErrorAction } from '../../../../api/api.actions';

export const selectDay = createAction('[DayPlan] Select Day', props<{ date: Date }>());
export const loadDays = createAction('[DayPlan] Load Days', props<{ fromDate: Date, toDate: Date }>());
export const loadDaysSuccess = createAction('[DayPlan/API] Load Days SUCCESS', props<{ days: Day[] }>());
export const loadDaysError = createApiErrorAction('[DayPlan/API] Load Days ERROR', 'DAY_PLAN.LOAD_DAYS_ERROR');
