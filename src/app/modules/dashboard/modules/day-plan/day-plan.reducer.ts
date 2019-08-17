import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as DayPlanActions from './day-plan.actions';
import * as fromApp from '../../../../app.recuder';

export const dayPlanFeatureKey = 'dayPlan';

export interface State {
  selectedDay: unknown;
  meals: {}[];
  statistics: {};
}

export const initialState: State = {
  selectedDay: {},
  meals: [ {}, {}, {} ],
  statistics: {},
};

const dayPlanReducer = createReducer(
  initialState,
  on(DayPlanActions.loadDayPlans, state => state),
);

export function reducer(state: State | undefined, action: Action): State {
  return dayPlanReducer(state, action);
}

export const selectDayPlan = createFeatureSelector<fromApp.AppState, State>(dayPlanFeatureKey);
