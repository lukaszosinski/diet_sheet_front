import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'diet-select',
  template: `
      <mat-form-field appearance="outline">
          <mat-label>{{label}}</mat-label>
          <mat-select value="{{value}}" (change)="onChange($event)" (blur)="onTouched()" [disabled]="isDisabled">
              <mat-option *ngFor="let option of getOptions()" [value]="option">
                  {{i18nKeyPrefix + option | translate}}
              </mat-option>
          </mat-select>
      </mat-form-field>
  `,
  styleUrls: [ './select.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectComponent), }
  ]
})
export class SelectComponent extends DefaultValueAccessor {

  @Input() optionsEnum!: { [key: string]: string };
  @Input() i18nKeyPrefix!: string;
  @Input() label?: string;
  value?: string;
  isDisabled: boolean = false;

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef, false);
  }

  getOptions(): string[] {
    return Object.values(this.optionsEnum);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
