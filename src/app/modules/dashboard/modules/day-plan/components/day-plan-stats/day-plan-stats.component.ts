import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Summary} from '../../../../../../api/models/summary';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../../app.recuder';
import * as fromDayPlan from '../../day-plan.reducer';
import * as DayPlanActions from '../../day-plan.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'diet-day-plan-stats',
  template: `
    <div class="day-plan-summary-wrapper" [ngClass]="{'day-plan-summary-wrapper-hidden':(shouldShowStats$ | async)==false }">
        <button class="summary-arrow"
                [ngClass]="{'rotated-summary-arrow': (shouldShowStats$ | async)==true}"
                (click)="onArrowClick()"
                title="{{'DAY_PLAN.TOGGLE_SUMMARY' | translate}}">
        </button>
        <div class="summary-element">
            <div class="summary-element-header-wrapper">
                <span>{{'SUMMARY.KCAL' | translate}}: </span>
                <span>{{eatenMealsSummary.kcal}} kcal</span>
                <span>{{summary.kcal}} kcal</span>
            </div>
            <meter min="0" max="{{summary.kcal}}" value="{{eatenMealsSummary.kcal}}"></meter>
        </div>
        <div class="summary-element">
            <div class="summary-element-header-wrapper">
                <span>{{'SUMMARY.PROTEINS' | translate}}: </span>
                <span>{{eatenMealsSummary.proteins}} g</span>
                <span>{{summary.proteins}} g</span>
            </div>
            <meter min="0" max="{{summary.proteins}}" value="{{eatenMealsSummary.proteins}}"></meter>
        </div>
        <div class="summary-element">
            <div class="summary-element-header-wrapper">
                <span>{{'SUMMARY.CARBS' | translate}}: </span>
                <span>{{eatenMealsSummary.carbs}} g</span>
                <span>{{summary.carbs}} g</span>
            </div>
            <meter min="0" max="{{summary.carbs}}" value="{{eatenMealsSummary.carbs}}"></meter>
        </div>
        <div class="summary-element">
            <div class="summary-element-header-wrapper">
                <span>{{'SUMMARY.FAT' | translate}}: </span>
                <span>{{eatenMealsSummary.fat}} g</span>
                <span>{{summary.fat}} g</span>
            </div>
            <meter min="0" max="{{summary.fat}}" value="{{eatenMealsSummary.fat}}"></meter>
        </div>
    </div>
  `,
  styleUrls: [ './day-plan-stats.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DayPlanStatsComponent {
  @Input() summary?: Summary;
  @Input() eatenMealsSummary?: Summary;

  shouldShowStats$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.shouldShowStats$ = this.store.select(fromDayPlan.selectShouldShowStats);
  }

  onArrowClick(): void {
    this.store.dispatch(DayPlanActions.toggleStats());
  }
}
