import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DayMeal } from '../../../../../../api/models/day-meal.model';


@Component({
  selector: 'diet-day-plan-meal',
  template: `
      <div class="diet-day-plan-meal-wrapper" [class.diet-day-plan-meal-wrapper--eaten]="dayMeal.eaten">
          <button class="meal-checkbox-button"
                  mat-icon-button
                  noClickPropagation
                  title="{{'DAY_PLAN.MARK_MEAL_AS_EATEN' | translate}}"
                  (click)="onEatenChange()">
              <input class="meal-checkbox" type="checkbox"
                     [checked]="dayMeal.eaten"
              />
          </button>
          <div class="meal-content">
              <div class="meal-content-name">{{dayMeal.meal.name}}</div>
              <diet-summary [summary]="dayMeal.meal.summary"></diet-summary>
          </div>
          <button class="delete-meal-button"
                  mat-icon-button
                  (click)="onDeleteButtonClick()"
                  noClickPropagation
                  title="{{'DAY_PLAN.DELETE_MEAL' | translate}}">
              <div class="delete-meal-icon"></div>
          </button>
      </div>
  `,
  styleUrls: [ './day-plan-meal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanMealComponent {
  @Input() dayMeal!: DayMeal;
  @Output() deleteDayMeal: EventEmitter<void> = new EventEmitter<void>();
  @Output() mealEatenMarkChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  onDeleteButtonClick(): void {
    this.deleteDayMeal.emit();
  }

  onEatenChange(): void {
    this.mealEatenMarkChanged.emit(!this.dayMeal.eaten);
  }
}
