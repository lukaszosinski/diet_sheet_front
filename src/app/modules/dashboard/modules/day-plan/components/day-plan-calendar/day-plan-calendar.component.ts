import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'diet-day-plan-calendar',
  template: `
      <p>
          day-plan-calendar works!
      </p>
  `,
  styleUrls: [ './day-plan-calendar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanCalendarComponent {
  @Input() selectedDay?: {};
}
