import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DayMeal} from '../../../../../../api/models/dayMeal.model';


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
              <label>{{dayMeal.meal.name}}</label>
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
  @Output() deleteDayMeal: EventEmitter<DayMeal> = new EventEmitter<DayMeal>();
  @Output() mealEatenMarkChanged: EventEmitter<DayMeal> = new EventEmitter<DayMeal>();

  eaten?: boolean;

  ngOnInit(): void {
    if (!!this.dayMeal) {
      this.eaten = this.dayMeal.eaten;
    }
  }

  onDeleteButtonClick(): void {
      this.deleteDayMeal.emit(this.dayMeal);
  }

  onCheckboxClick(): void {
    if (!!this.dayMeal && this.eaten !== undefined) {
      const updatedDayMeal =  {...this.dayMeal, eaten: this.eaten};
      this.mealEatenMarkChanged.emit(updatedDayMeal);
    }
  }
}
