import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'diet-day-plan-calendar',
  template: `
      <div class="calendar">
          <button type="button" class="calendar-redirect-button">KALENDARZ</button>
          <ul class="calendar-list">
              <li class="calendar-list-item">5</li>
              <li class="calendar-list-item">6</li>
              <li class="calendar-list-item calendar-list-item-central">
                  <div class="calendar-list-item-central-month">Czerwiec</div>
                  <div class="calendar-list-item-central-day">7</div>
                  <div class="calendar-list-item-central-day-of-month">środa</div>
              </li>
              <li class="calendar-list-item">8</li>
              <li class="calendar-list-item">9</li>
          </ul>
      </div>
  `,
  styleUrls: [ './day-plan-calendar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanCalendarComponent {
  @Input() selectedDay?: {};
}
