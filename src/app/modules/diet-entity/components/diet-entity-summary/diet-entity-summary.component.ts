import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'diet-entity-summary',
  template: `
      <div class="summary-wrapper" [formGroup]="summaryFormGroup">
          <div class="summary">
              <input type="number" class="summary-quantity-input" name="kcal" formControlName="kcal">
              <div class="summary-img kcal-img"></div>
              <div class="summary-label">{{'SUMMARY.kcal' | translate}}</div>
          </div>
          <div class="summary">
              <input type="number" class="summary-quantity-input" name="carbs" formControlName="carbs">
              <div class="summary-img carbs-img"></div>
              <div class="summary-label">{{'SUMMARY.carbs' | translate}}</div>
          </div>
          <div class="summary">
              <input type="number" class="summary-quantity-input" name="proteins" formControlName="proteins">
              <div class="summary-img proteins-img"></div>
              <div class="summary-label">{{'SUMMARY.proteins' | translate}}</div>
          </div>
          <div class="summary">
              <input type="number" class="summary-quantity-input" name="fat" formControlName="fat">
              <div class="summary-img fat-img"></div>
              <div class="summary-label">{{'SUMMARY.fat' | translate}}</div>
          </div>
      </div>
  `,
  styleUrls: [ './diet-entity-summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntitySummaryComponent {
  @Input() summaryFormGroup!: FormGroup;
}
