import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

  constructor(private store: Store<any>) {
    console.log(store);
  }

  ngOnInit(): void {
  }

}
