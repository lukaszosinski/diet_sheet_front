import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'diet-day-plan-stats',
  template: `
      <p>
          day-plan-stats works!
      </p>
  `,
  styleUrls: [ './day-plan-stats.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanStatsComponent {
  @Input() statistics?: {};
}
