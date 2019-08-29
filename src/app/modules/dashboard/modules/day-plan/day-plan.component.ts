import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../app.recuder';
import * as fromDayPlan from './day-plan.reducer';
import * as DayPlanActions from './day-plan.actions';
import { addDays, getDay } from '../../../shared/utils/date-utils';
import { Summary } from '../../../../api/models/summary';
import { DayMeal } from '../../../../api/models/day-meal.model';
import { combineLatest, map } from 'rxjs/operators';
import { DashboardScrollPositionService } from '../../dashboard-scroll-position.service';

@Component({
  selector: 'diet-day-plan',
  template: `
      <div class="diet-day-plan-wrapper">
          <diet-day-plan-calendar class="diet-day-plan-calendar"
                                  [selectedDate]="getSelectedDate() | async"
                                  (newDaySelected)="onNewDaySelected($event)"
          ></diet-day-plan-calendar>
          <ul *ngIf="(shouldDisplayDayPlanMeals() | async)" class="diet-day-plan-meal-list">
              <li *ngFor="let dayMeal of (getSelectedDayPlanDayMeals() | async)">
                  <diet-day-plan-meal
                          [dayMeal]="dayMeal"
                          (deleteDayMeal)="onDeleteDayMeal(dayMeal)"
                          (mealEatenMarkChanged)="onMealEatenMarkChanged(dayMeal, $event)"></diet-day-plan-meal>
              </li>
          </ul>
          <button class="diet-day-plan-add-product" title="{{'DAY_PLAN.ADD_PRODUCT' | translate}}">+</button>
          <diet-day-plan-stats *ngIf="(shouldDisplayDayPlanStats() | async)"
                               class="diet-day-plan-stats"
                               [class.diet-day-plan-stats--hidden]="!shouldExpandStats"
                               [isExpanded]="shouldExpandStats"
                               (toggleExpansion)="onToggleExpansion()"
                               [summary]="getSelectedDayPlanSummary() | async"
                               [eatenMealsSummary]="getSelectedDayPlanEatenMealsSummary() | async">
          </diet-day-plan-stats>
      </div>
  `,
  styleUrls: [ './day-plan.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanComponent implements OnInit {

  private STATS_EXPAND_SCROLL_THRESHOLD_PX = 20;
  private readonly PREVIOUS_DAYS_QUANTITY = 3;
  private readonly NEXT_DAYS_QUANTITY = 3;

  shouldExpandStats: boolean = false;

  constructor(private store: Store<AppState>,
              private dashboardScrollPosition: DashboardScrollPositionService,
              private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    const day = new Date();
    this.selectDay(day);
    this.loadNearbyDays(day);
    this.checkIfShouldExpandStats()
      .subscribe((shouldExpandStats) => {
        if (this.shouldExpandStats !== shouldExpandStats) {
          this.shouldExpandStats = shouldExpandStats;
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  private checkIfShouldExpandStats(): Observable<boolean> {
    return this.store.select(fromDayPlan.selectShouldShowStats)
      .pipe(
        combineLatest(this.dashboardScrollPosition.isScrolledToBottom(this.STATS_EXPAND_SCROLL_THRESHOLD_PX)),
        map(([ shouldShowStats, isScrolledToBottom ]) => shouldShowStats || isScrolledToBottom)
      );
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

  onDeleteDayMeal(dayMealToDelete: DayMeal): void {
    this.store.dispatch(DayPlanActions.deleteSelectedDayDayMeal({ dayMeal: dayMealToDelete }));
  }

  onMealEatenMarkChanged(dayMeal: DayMeal, eaten: boolean): void {
    const dayMealToUpdate = { ...dayMeal, eaten };
    this.store.dispatch(DayPlanActions.updateSelectedDayDayMeal({ dayMeal: dayMealToUpdate }));
  }

  onToggleExpansion(): void {
    this.store.dispatch(DayPlanActions.toggleStatsVisibility());
  }

  shouldDisplayDayPlanMeals(): Observable<boolean> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanExists);
  }

  shouldDisplayDayPlanStats(): Observable<boolean> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanDayMeals)
      .pipe(map(meals => !!meals && !!meals.length));
  }

  getSelectedDate(): Observable<Date> {
    return this.store.select(fromDayPlan.selectSelectedDate);
  }

  getSelectedDayPlanDayMeals(): Observable<DayMeal[] | undefined> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanDayMeals);
  }

  getSelectedDayPlanSummary(): Observable<Summary | undefined> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanSummary);
  }

  getSelectedDayPlanEatenMealsSummary(): Observable<Summary | undefined> {
    return this.store.select(fromDayPlan.selectSelectedDayPlanEatenMealsSummary);
  }
}
