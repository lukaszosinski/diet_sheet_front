import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {DayMeal} from '../../../../../../api/models/dayMeal.model';


@Component({
  selector: 'diet-day-plan-meal',
  template: `
      <div class="content-wrapper">
          <input class="meal-checkbox" type="checkbox" title="{{'DAY_PLAN.MARK_MEAL_AS_EATEN' | translate}}"/>
          <div class="meal-content">
              <label>{{dayMeal.meal.name}}</label>
              <diet-summary [summary]="dayMeal.meal.summary"></diet-summary>
          </div>
          <button class="delete-meal-button" title="{{'DAY_PLAN.DELETE_MEAL' | translate}}"></button>
      </div>
  `,
  styleUrls: [ './day-plan-meal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanMealComponent {
  @Input() dayMeal?: DayMeal;
}
