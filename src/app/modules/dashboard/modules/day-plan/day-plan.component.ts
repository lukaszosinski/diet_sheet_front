import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../app.recuder';
import * as fromDayPlan from './day-plan.reducer';
import * as DayPlanActions from './day-plan.actions';
import { addDays, getDay } from '../../../shared/utils/date-utils';
import { Meal } from '../../../../api/models/meal';
import { Summary } from '../../../../api/models/summary';

@Component({
  selector: 'diet-day-plan',
  template: `
      <div class="diet-day-plan-wrapper">
          <diet-day-plan-calendar [selectedDate]="getSelectedDate() | async"
                                  (newDaySelected)="onNewDaySelected($event)"
          ></diet-day-plan-calendar>
          <ng-container *ngIf="(shouldDisplayDayPlan() | async)">
              <ul class="diet-day-plan-meal-list">
                  <li *ngFor="let meal of (getSelectedDayPlanMeals() | async)">
                      <diet-day-plan-meal [meal]="meal"></diet-day-plan-meal>
                  </li>
              </ul>
              <button class="diet-day-plan-add-product" title="{{'DAY_PLAN.ADD_PRODUCT' | translate}}">+</button>
              <diet-day-plan-stats [statistics]="getSelectedDayPlanSummary() | async"></diet-day-plan-stats>
          </ng-container>
      </div>
  `,
  styleUrls: [ './day-plan.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanComponent implements OnInit {

  private readonly PREVIOUS_DAYS_QUANTITY = 3;
  private readonly NEXT_DAYS_QUANTITY = 3;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    const day = new Date();
    this.selectDay(day);
    this.loadNearbyDays(day);
  }

  onNewDaySelected(day: Date): void {
    this.selectDay(day);
    this.loadNearbyDays(day);
  }

  private selectDay(date: Date): void {
    this.store.dispatch(DayPlanActions.selectDay({ date }));
  }

  private loadNearbyDays(date: Date): void {
    const day = getDay(date);
    const fromDate = addDays(day, -this.PREVIOUS_DAYS_QUANTITY);
    const toDate = addDays(day, this.NEXT_DAYS_QUANTITY);
    this.store.dispatch(DayPlanActions.loadDays({ fromDate, toDate }));
  }

  getSelectedDate(): Observable<Date> {
    return this.store.select(fromDayPlan.selectSelectedDate);
  }

  shouldDisplayDayPlan(): Observable<boolean> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanExists);
  }

  getSelectedDayPlanMeals(): Observable<Meal[] | undefined> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanMeals);
  }

  getSelectedDayPlanSummary(): Observable<Summary | undefined> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanSummary);
  }
}
