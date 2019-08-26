import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DayMeal } from '../../../../../../api/models/day-meal.model';


@Component({
  selector: 'diet-day-plan-meal',
  template: `
      <div class="content-wrapper">
          <input class="meal-checkbox" type="checkbox"
                 [(ngModel)]="eaten"
                 (change)="onCheckboxClick()"
                 title="{{'DAY_PLAN.MARK_MEAL_AS_EATEN' | translate}}"
          />
          <div class="meal-content">
              <div class="meal-content-name">{{dayMeal.meal.name}}</div>
              <diet-summary [summary]="dayMeal.meal.summary"></diet-summary>
          </div>
          <button class="delete-meal-button" (click)="onDeleteButtonClick()" title="{{'DAY_PLAN.DELETE_MEAL' | translate}}"></button>
      </div>
  `,
  styleUrls: [ './day-plan-meal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanMealComponent implements OnInit {
  @Input() dayMeal?: DayMeal;
  @Output() deleteDayMeal: EventEmitter<void> = new EventEmitter<void>();
  @Output() mealEatenMarkChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  eaten?: boolean;

  ngOnInit(): void {
    if (!!this.dayMeal) {
      this.eaten = this.dayMeal.eaten;
    }
  }

  onDeleteButtonClick(): void {
      this.deleteDayMeal.emit();
  }

  onCheckboxClick(): void {
    if (!!this.dayMeal) {
      this.mealEatenMarkChanged.emit(this.eaten);
    }
  }
}
