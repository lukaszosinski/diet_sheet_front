import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {FormGroup} from '@angular/forms';

@Component({
  selector: 'diet-product-summary',
  template: `
    <div class="product-summary-wrapper" [formGroup]="parentForm">
        <div formGroupName="summary">
            <input type="text" name="kcal" formControlName="kcal">
            <input type="text" name="proteins" formControlName="proteins">
            <input type="text" name="carbs" formControlName="carbs">
            <input type="text" name="fat" formControlName="fat">
        </div>
    </div>
  `,
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  @Input() parentForm?: FormGroup;
  constructor() {}
}
