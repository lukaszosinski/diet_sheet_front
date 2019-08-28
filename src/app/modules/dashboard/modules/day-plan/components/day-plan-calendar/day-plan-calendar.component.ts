import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addDays } from '../../../../../shared/utils/date-utils';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'diet-day-plan-calendar',
  template: `
      <div class="calendar">
          <button type="button" class="calendar-redirect-button">{{'DAY_PLAN.CALENDAR' | translate | uppercase }}</button>
          <button class="calendar-arrow-left" (click)="onLeftArrowClick()"></button>
          <ul class="calendar-list">
              <li class="calendar-list-item"
                  *ngFor="let previousDay of previousDays"
                  (click)="onSideListItemClick(previousDay)"
              >{{previousDay.getDate()}}</li>
              <li class="calendar-list-item calendar-list-item-central">
                  <ng-container *ngIf="!!selectedDate">
                      <div class="calendar-list-item-central-month">{{'COMMON.MONTH.' + selectedMonth | translate | titlecase}}</div>
                      <div class="calendar-list-item-central-day">{{selectedDayNumber}}</div>
                      <div class="calendar-list-item-central-day-of-month">{{'COMMON.DAY.' + selectedDay | translate}}</div>
                  </ng-container>
              </li>
              <li class="calendar-list-item"
                  *ngFor="let nextDay of nextDays"
                  (click)="onSideListItemClick(nextDay)">{{nextDay.getDate()}}</li>
          </ul>
          <button class="calendar-arrow-right" (click)="onRightArrowClick()"></button>
      </div>
  `,
  styleUrls: [ './day-plan-calendar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanCalendarComponent implements OnInit {

  private sideListItemsQuantity: number = this.getSideListItemsQuantity();
  @Input() selectedDate?: Date;
  @Output() newDaySelected: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .subscribe((() => {
        const computedSideListItemsQuantity = this.getSideListItemsQuantity();
        if (this.sideListItemsQuantity !== computedSideListItemsQuantity) {
          this.sideListItemsQuantity = computedSideListItemsQuantity;
          this.changeDetectorRef.markForCheck();
        }
      }));
  }

  private getSideListItemsQuantity(): number {
    const width = window.innerWidth;
    if (width <= 450) {
      return 1;
    } else if (width <= 750) {
      return 2;
    } else {
      return 3;
    }
  }

  get previousDays(): Date[] | null[] {
    const previousDays = Array(this.getSideListItemsQuantity()).fill(null);
    if (!this.selectedDate) {
      return previousDays;
    }
    return previousDays.map((_, index) => addDays(this.selectedDate as Date, index - this.getSideListItemsQuantity()));
  }

  get selectedDayNumber(): number | undefined {
    return !!this.selectedDate ? this.selectedDate.getDate() : undefined;
  }

  get nextDays(): Date[] | null[] {
    const nextDays = Array(this.getSideListItemsQuantity()).fill(null);
    if (!this.selectedDate) {
      return nextDays;
    }
    return nextDays.map((_, index) => addDays(this.selectedDate as Date, index + 1));
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

  onSideListItemClick(day: Date): void {
    this.newDaySelected.emit(day);
  }
}

