import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'diet-input',
  template: `
      <mat-form-field appearance="outline" [class.readonly]="readonly">
          <mat-label>{{label}}</mat-label>
          <input [type]="type" matInput (change)="onChange($event.target.value)" (blur)="onTouched()" [value]="value">
      </mat-form-field>
  `,
  styleUrls: [ './input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => InputComponent), }
  ],
})
export class InputComponent extends DefaultValueAccessor {

  @Input() label?: string;
  @Input() type: 'text' | 'number' = 'text';
  @Input() readonly: boolean = false;
  @Input() value: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef,
              renderer: Renderer2,
              elementRef: ElementRef,
  ) {
    super(renderer, elementRef, false);
  }

  writeValue(value: string): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }
}
