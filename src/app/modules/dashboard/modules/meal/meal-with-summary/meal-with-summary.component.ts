import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../meal.model';

@Component({
  selector: 'diet-meal-with-summary',
  template: `
      <div class="meal-content" tabindex="0" (keyup.space)="onClick($event)">
          <div class="meal-content-name">{{meal.name}}</div>
          <diet-summary [summary]="meal.summary" [wrap]="true" [theme]="'alternative'"></diet-summary>
      </div>
  `,
  styleUrls: [ './meal-with-summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealWithSummaryComponent {
  @Input() meal!: Meal;
  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.click.emit(event);
  }
}
