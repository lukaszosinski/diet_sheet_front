import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {FormGroup} from '@angular/forms';

@Component({
  selector: 'diet-product-summary',
  template: `
    <div class="product-summary-wrapper" [formGroup]="parentForm">
        <div formGroupName="summary">
            <input type="text" id="kcal" name="kcal" [formControlName]="'kcal'">
            <input type="text" id="proteins" name="proteins" [formControlName]="'proteins'">
            <input type="text" id="carbs" name="carbs" [formControlName]="'carbs'">
            <input type="text" id="fat" name="fat" [formControlName]="'fat'">
        </div>
    </div>
  `,
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  @Input() parentForm?: FormGroup;
  constructor() { }
}
