import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../app.recuder';
import * as fromDayPlan from './day-plan.reducer';
import * as DayPlanActions from './day-plan.actions';
import { Day } from '../../../../api/models/day';

@Component({
  selector: 'diet-day-plan',
  template: `
      <diet-day-plan-calendar [selectedDate]="(state$ | async).date"
                              (newDaySelected)="onNewDaySelected($event)"
      ></diet-day-plan-calendar>
      <ul class="diet-day-plan-meal-list">
          <li *ngFor="let meal of (state$ | async).meals">
              <diet-day-plan-meal [meal]="meal"></diet-day-plan-meal>
          </li>
      </ul>
      <button class="diet-day-plan-add-product" title="{{'DAY_PLAN.ADD_PRODUCT' | translate}}">+</button>
      <diet-day-plan-stats [statistics]="(state$ | async).summary"></diet-day-plan-stats>
  `,
  styleUrls: [ './day-plan.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanComponent implements OnInit {

  readonly state$: Observable<Day | undefined>;

  constructor(private store: Store<AppState>) {
    this.state$ = this.store.select(fromDayPlan.selectSelectedDayPlan);
  }

  ngOnInit(): void {
    this.loadDay(new Date());
  }

  onNewDaySelected(day: Date): void {
    this.loadDay(day);
  }

  loadDay(date: Date): void {
    this.store.dispatch(DayPlanActions.loadDay({ date }));
  }
}
