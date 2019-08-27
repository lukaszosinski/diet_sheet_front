import { createAction, props } from '@ngrx/store';
import { Day } from '../../../../api/models/day';
import { createApiErrorAction } from '../../../../api/api.actions';
import { DayMeal } from '../../../../api/models/day-meal.model';

export const selectDay = createAction('[DayPlan] Select Day', props<{ date: Date }>());
export const loadDays = createAction('[DayPlan] Load Days', props<{ fromDate: Date, toDate: Date }>());
export const loadDaysSuccess = createAction('[DayPlan/API] Load Days SUCCESS', props<{ days: Day[] }>());
export const loadDaysError = createApiErrorAction('[DayPlan/API] Load Days ERROR', 'DAY_PLAN.LOAD_DAYS_ERROR');

export const updateDaySuccess = createAction('[DayPlan/API] Update Day SUCCESS', props<{ day: Day }>());
export const updateDayError = createApiErrorAction('[DayPlan/API] Update Day ERROR', 'DAY_PLAN.UPDATE_DAY_ERROR');

export const updateSelectedDayDayMeal = createAction('[DayPlan] Update DayMeal', props<{ dayMeal: DayMeal }>());
export const deleteSelectedDayDayMeal = createAction('[DayPlan] Delete DayMeal', props<{ dayMeal: DayMeal }>());

