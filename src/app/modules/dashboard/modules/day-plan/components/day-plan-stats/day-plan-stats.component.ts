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
            {{eatenMealsSummary.kcal}} / {{summary.kcal}}
        </div>
        <div class="summary-element">
            {{eatenMealsSummary.proteins}} / {{summary.proteins}}
        </div>
        <div class="summary-element">
            {{eatenMealsSummary.carbs}} / {{summary.carbs}}
        </div>
        <div class="summary-element">
            {{eatenMealsSummary.fat}} / {{summary.fat}}
        </div>
        <div class="summary-element">
            {{eatenMealsSummary.roughage}} / {{summary.roughage}}
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
