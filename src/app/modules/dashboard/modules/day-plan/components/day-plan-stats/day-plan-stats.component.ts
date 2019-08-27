import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Summary} from '../../../../../../api/models/summary';

@Component({
  selector: 'diet-day-plan-stats',
  template: `
    <div class="day-plan-summary-wrapper" [ngClass]="{'day-plan-summary-wrapper-hidden':shouldBeHidden==true }">
        <button class="summary-arrow"
                [ngClass]="{'rotated-summary-arrow': shouldBeHidden==false}"
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

  shouldBeHidden: boolean;

  constructor() {
    this.shouldBeHidden = true;
  }

  onArrowClick(): void {
    this.shouldBeHidden = !this.shouldBeHidden;
  }
}
