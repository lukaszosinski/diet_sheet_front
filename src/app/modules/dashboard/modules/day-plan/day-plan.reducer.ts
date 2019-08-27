import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as DayPlanActions from './day-plan.actions';
import * as fromApp from '../../../../app.recuder';
import { Day } from '../../../../api/models/day';
import { isSameDay } from '../../../shared/utils/date-utils';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';

export const dayPlanFeatureKey = 'dayPlan';

export interface State extends EntityState<Day> {
  selectedDate: Date;
  selectedDay?: Day;
  processing: {
    loadDay: boolean,
    updateDay: boolean
  };
}

export const adapter: EntityAdapter<Day> = createEntityAdapter<Day>();

export const initialState: State = adapter.getInitialState({
  selectedDate: new Date(),
  selectedDay: undefined,
  processing: {
    loadDay: false,
    updateDay: false,
  }
});

const dayPlanReducer = createReducer(
  initialState,
  on(DayPlanActions.selectDay,
    (state, { date }) => ({
      ...state,
      selectedDate: date,
      selectedDay: findDayByDate(state.entities, date),
    })
  ),
  on(DayPlanActions.loadDays,
    (state) => {
      return { ...state, processing: { ...state.processing, loadDay: true } };
    }),
  on(DayPlanActions.loadDaysSuccess, (state, { days }) => {
    const withUpdatedDays = adapter.upsertMany(days, state);
    return {
      ...withUpdatedDays,
      selectedDay: findDayByDate(withUpdatedDays.entities, state.selectedDate),
      processing: { ...state.processing, loadDay: false }
    };
  }),
  on(DayPlanActions.loadDaysError, state => ({ ...state, processing: { ...state.processing, loadDay: false } })),
  on(
    DayPlanActions.updateSelectedDayDayMeal,
    DayPlanActions.updateDay,
    DayPlanActions.createDay,
    state => ({ ...state, processing: { ...state.processing, updateDay: true } })),
  on(DayPlanActions.upsertDaySuccess, (state, { day }) => {
    const withUpdatedDay = adapter.upsertOne(day, state);
    return {
      ...withUpdatedDay,
      selectedDay: findDayByDate(withUpdatedDay.entities, state.selectedDate),
      processing: { ...state.processing, updateDay: false }
    };
  }),
  on(DayPlanActions.upsertDayError, state => ({ ...state, processing: { ...state.processing, updateDay: false } }))
);

function findDayByDate(days: Dictionary<Day>, date: Date): Day | undefined {
  return Object.values(days).find(day => !!day && isSameDay(day.date, date.getTime()));
}

export function reducer(state: State | undefined, action: Action): State {
  return dayPlanReducer(state, action);
}

export const selectDayPlan = createFeatureSelector<fromApp.AppState, State>(dayPlanFeatureKey);

export const selectSelectedDay = createSelector(
  selectDayPlan,
  (state: State) => state.selectedDay
);

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

export const selectLoadedDays = createSelector(
  selectDayPlan,
  adapter.getSelectors().selectAll
);
