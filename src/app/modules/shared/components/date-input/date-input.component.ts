import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { Moment } from 'moment';

@Component({
  selector: 'diet-date-input',
  template: `
      <mat-form-field appearance="outline" [class.readonly]="readonly">
          <mat-label>{{label}}</mat-label>
          <input matInput [matDatepicker]="datepicker" (dateChange)="onDateChange($event)" (blur)="onTouched()" [value]="value">
          <mat-datepicker-toggle matSuffix [for]="datepicker"></mat-datepicker-toggle>
          <mat-datepicker #datepicker [startView]="startView"></mat-datepicker>
      </mat-form-field>
  `,
  styleUrls: [ './date-input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => DateInputComponent), }
  ],
})
export class DateInputComponent extends DefaultValueAccessor {

  @Input() label?: string;
  @Input() readonly: boolean = false;
  @Input() value?: Date = new Date();
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';

  constructor(private changeDetectorRef: ChangeDetectorRef,
              renderer: Renderer2,
              elementRef: ElementRef,
  ) {
    super(renderer, elementRef, false);
  }

  onDateChange($event: MatDatepickerInputEvent<Moment>): void {
    this.onChange($event.value && $event.value.valueOf());
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  writeValue(value: number): void {
    this.value = new Date(value);
    this.changeDetectorRef.markForCheck();
  }
}
