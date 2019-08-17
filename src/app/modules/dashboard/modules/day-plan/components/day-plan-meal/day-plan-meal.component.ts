import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Meal} from "../../../../../../api/models/meal";

@Component({
  selector: 'diet-day-plan-meal',
  template: `
      <p>
          day-plan-meal works!
      </p>
  `,
  styleUrls: [ './day-plan-meal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanMealComponent {
  @Input() meal?: Meal;
}
