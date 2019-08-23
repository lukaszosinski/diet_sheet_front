import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as DayPlanActions from './day-plan.actions';
import * as fromApp from '../../../../app.recuder';
import { Day } from '../../../../api/models/day';
import { isSameDay } from '../../../shared/utils/date-utils';

export const dayPlanFeatureKey = 'dayPlan';

export interface State {
  selectedDate: Date;
  selectedDay?: Day;
  loadedDays: Day[];
  processing: {
    loadDay: boolean;
  };
}

export const initialState: State = {
  selectedDate: new Date(),
  selectedDay: undefined,
  loadedDays: [],
  processing: {
    loadDay: false,
  }
};

const dayPlanReducer = createReducer(
  initialState,
  on(DayPlanActions.selectDay,
    (state, { date }) => ({
      ...state,
      selectedDate: date,
      selectedDay: findDayByDate(state.loadedDays, date),
    })
  ),
  on(DayPlanActions.loadDays,
    (state) => {
      return { ...state, processing: { ...state.processing, loadDay: true } };
    }),
  on(DayPlanActions.loadDaysSuccess, (state, { days }) => {
    const daysIds = days.map(d => d.id);
    const filteredLoadedDays = state.loadedDays.filter(loadedDay => !daysIds.includes(loadedDay.id));
    const updatedLoadedDays = [ ...days, ...filteredLoadedDays ];
    return {
      ...state,
      selectedDay: findDayByDate(updatedLoadedDays, state.selectedDate),
      loadedDays: updatedLoadedDays,
      processing: { ...state.processing, loadDay: false }
    };
  }),
  on(DayPlanActions.loadDaysError, state => ({ ...state, processing: { ...state.processing, loadDay: false } })),
);

function findDayByDate(days: Day[], date: Date): Day | undefined {
  return days.find(day => isSameDay(day.date, date.getTime()));
}

export function reducer(state: State | undefined, action: Action): State {
  return dayPlanReducer(state, action);
}

export const selectDayPlan = createFeatureSelector<fromApp.AppState, State>(dayPlanFeatureKey);

export const selectSelectedDate = createSelector(
  selectDayPlan,
  (state: State) => state.selectedDate
);

export const selectSelectedDayPlanExists = createSelector(
  selectDayPlan,
  (state: State) => !!state.selectedDay
);

export const selectSelectedDayPlan = createSelector(
  selectDayPlan,
  (state: State) => state.selectedDay
);

export const selectSelectedDayPlanSummary = createSelector(
  selectSelectedDayPlan,
  (selectedDay: Day | undefined) => selectedDay ? selectedDay.summary : undefined
);

export const selectSelectedDayPlanDayMeals = createSelector(
  selectSelectedDayPlan,
  (selectedDay) => selectedDay ? selectedDay.dayMeals : undefined
);
