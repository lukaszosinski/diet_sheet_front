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
            <span>{{'SUMMARY.KCAL' | translate}}:</span>
            <meter min="0" max="{{summary.kcal}}" value="{{eatenMealsSummary.kcal}}"></meter>
        </div>
        <div class="summary-element">
            <span>{{'SUMMARY.PROTEINS' | translate}}:</span>
            <meter min="0" max="{{summary.proteins}}" value="{{eatenMealsSummary.proteins}}"></meter>
        </div>
        <div class="summary-element">
            <span>{{'SUMMARY.CARBS' | translate}}:</span>
            <meter min="0" max="{{summary.carbs}}" value="{{eatenMealsSummary.carbs}}"></meter>
        </div>
        <div class="summary-element">
            <span>{{'SUMMARY.FAT' | translate}}:</span>
            <meter min="0" max="{{summary.fat}}" value="{{eatenMealsSummary.fat}}"></meter>
        </div>
        <div class="summary-element">
            <span>{{'SUMMARY.ROUGHAGE' | translate}}:</span>
            <meter min="0" max="{{summary.roughage}}" value="{{eatenMealsSummary.roughage}}"></meter>
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
