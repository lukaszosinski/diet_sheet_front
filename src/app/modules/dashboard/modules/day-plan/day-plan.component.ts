import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDayPlan from './day-plan.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'diet-day-plan',
  template: `
      <p>
          day-plan works!
      </p>
  `,
  styleUrls: [ './day-plan.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanComponent implements OnInit {

  state$: Observable<fromDayPlan.State>;

  constructor(private store: Store<any>) {
    this.state$ = this.store.select(fromDayPlan.selectDayPlan);
  }

  ngOnInit(): void {
  }

}
