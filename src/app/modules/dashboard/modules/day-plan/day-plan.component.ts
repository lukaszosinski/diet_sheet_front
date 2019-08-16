import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDayPlan from './day-plan.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'diet-day-plan',
  template: `
      <diet-day-plan-calendar [selectedDay]="(state$ | async).selectedDay"></diet-day-plan-calendar>
      <ul class="diet-day-plan-product-list">
          <li *ngFor="let product of (state$ | async).products">
              <diet-day-plan-product [product]="product"></diet-day-plan-product>
          </li>
      </ul>
      <button class="diet-day-plan-add-product" title="{{'DAY_PLAN.ADD_PRODUCT' | translate}}">+</button>
      <diet-day-plan-stats [statistics]="(state$ | async).statistics"></diet-day-plan-stats>
  `,
  styleUrls: [ './day-plan.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanComponent {

  state$: Observable<fromDayPlan.State>;

  constructor(private store: Store<any>) {
    this.state$ = this.store.select(fromDayPlan.selectDayPlan);
  }
}
