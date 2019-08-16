import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as DayPlanActions from './day-plan.actions';
import * as fromApp from '../../../../app.recuder';
import { authorizationFeatureKey } from '../../../authorization/authorization.reducer';

export const dayPlanFeatureKey = 'dayPlan';

// tslint:disable-next-line:no-empty-interface
export interface State {

}

export const initialState: State = {};

const dayPlanReducer = createReducer(
  initialState,
  on(DayPlanActions.loadDayPlans, state => state),
);

export function reducer(state: State | undefined, action: Action): State {
  return dayPlanReducer(state, action);
}

export const selectDayPlan = createFeatureSelector<fromApp.AppState, State>(authorizationFeatureKey);
