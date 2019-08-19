import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as DayPlanActions from './day-plan.actions';
import * as fromApp from '../../../../app.recuder';
import { Day } from '../../../../api/models/day';

export const dayPlanFeatureKey = 'dayPlan';

export interface State {
  selectedDay?: Day;
  processing: {
    loadDay: boolean;
  };
}

export const initialState: State = {
  selectedDay: undefined,
  processing: {
    loadDay: false,
  }
};

const dayPlanReducer = createReducer(
  initialState,
  on(DayPlanActions.loadDay, state => ({ ...state, processing: { ...state.processing, loadDay: true } })),
  on(DayPlanActions.loadDaySuccess, (state, { day }) => ({
    ...state,
    selectedDay: day,
    processing: { ...state.processing, loadDay: false }
  })),
  on(DayPlanActions.loadDayError, state => ({ ...state, processing: { ...state.processing, loadDay: false } })),
);

export function reducer(state: State | undefined, action: Action): State {
  return dayPlanReducer(state, action);
}

export const selectDayPlan = createFeatureSelector<fromApp.AppState, State>(dayPlanFeatureKey);
export const selectSelectedDayPlan = createSelector(
  selectDayPlan,
  (state: State) => state.selectedDay
);
