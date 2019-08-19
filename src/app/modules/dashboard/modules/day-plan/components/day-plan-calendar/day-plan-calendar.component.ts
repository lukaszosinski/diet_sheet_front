import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { addDays, getDay } from '../../../../../shared/utils/date-utils';

@Component({
  selector: 'diet-day-plan-calendar',
  template: `
      <div class="calendar">
          <button type="button" class="calendar-redirect-button">{{'DAY_PLAN.CALENDAR' | translate | uppercase }}</button>
          <button class="calendar-arrow-left" (click)="onLeftArrowClick()"></button>
          <ul class="calendar-list">
              <li class="calendar-list-item"
                  *ngFor="let previousDayNumber of previousDayNumbers"
                  (click)="onSideListItemClick(previousDayNumber)"
              >{{previousDayNumber}}</li>
              <li class="calendar-list-item calendar-list-item-central">
                  <ng-container *ngIf="!!selectedDate">
                      <div class="calendar-list-item-central-month">{{'COMMON.MONTH.' + selectedMonth | translate}}</div>
                      <div class="calendar-list-item-central-day">{{selectedDayNumber}}</div>
                      <div class="calendar-list-item-central-day-of-month">{{'COMMON.DAY.' + selectedDay | translate}}</div>
                  </ng-container>
              </li>
              <li class="calendar-list-item"
                  *ngFor="let nextDayNumber of nextDayNumbers"
                  (click)="onSideListItemClick(nextDayNumber)">{{nextDayNumber}}</li>
          </ul>
          <button class="calendar-arrow-right" (click)="onRightArrowClick()"></button>
      </div>
  `,
  styleUrls: [ './day-plan-calendar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanCalendarComponent {

  @Input() selectedDate?: Date;
  @Input() sideListItemsQuantity: number = 2;
  @Output() newDaySelected: EventEmitter<Date> = new EventEmitter<Date>();

  get previousDayNumbers(): number[] | null[] {
    const previousDays = Array(this.sideListItemsQuantity).fill(null);
    if (!this.selectedDate) {
      return previousDays;
    }
    return previousDays.map((_, index) => addDays(this.selectedDate as Date, index - this.sideListItemsQuantity).getDate());
  }

  get selectedDayNumber(): number | undefined {
    return !!this.selectedDate ? this.selectedDate.getDate() : undefined;
  }

  get nextDayNumbers(): number[] | null[] {
    const nextDays = Array(this.sideListItemsQuantity).fill(null);
    if (!this.selectedDate) {
      return nextDays;
    }
    return nextDays.map((_, index) => addDays(this.selectedDate as Date, index + 1).getDate());
  }

  get selectedMonth(): number | undefined {
    return !!this.selectedDate ? this.selectedDate.getMonth() : undefined;
  }

  get selectedDay(): number | undefined {
    return !!this.selectedDate ? this.selectedDate.getDay() : undefined;
  }

  onLeftArrowClick(): void {
    if (this.selectedDate) {
      this.newDaySelected.emit(addDays(this.selectedDate, -1));
    }
  }

  onRightArrowClick(): void {
    if (this.selectedDate) {
      this.newDaySelected.emit(addDays(this.selectedDate, 1));
    }
  }

  onSideListItemClick(dayNumber: number): void {
    const newDay = getDay(new Date());
    newDay.setDate(dayNumber);
    this.newDaySelected.emit(newDay);
  }
}
