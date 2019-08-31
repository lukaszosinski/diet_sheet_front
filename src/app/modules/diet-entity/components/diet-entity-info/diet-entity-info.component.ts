import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DietEntityInfoPlaceholderKeys } from './diet-entity-info-placeholder-keys';
import { ProductUnitEnum } from '../../../dashboard/modules/product/product-unit.enum';

@Component({
  selector: 'diet-entity-info',
  template: `
      <div class="diet-entity-info" [formGroup]="infoFormGroup">
          <input class="diet-entity-info-name" name="name" formControlName="name" [placeholder]="placeholderKeys.name | translate">
          <select *ngIf="displayUnits"
                  class="diet-entity-info-unit"
                  name="unit"
                  formControlName="unit">
              <option *ngFor="let unit of UNITS" [value]="unit">{{'ENUM.PRODUCT_UNIT.' + unit | translate}}</option>
          </select>
          <textarea class="diet-entity-info-description"
                    name="description"
                    formControlName="description"
                    [placeholder]="placeholderKeys.description | translate"></textarea>
      </div>
  `,
  styleUrls: [ './diet-entity-info.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntityInfoComponent {

  readonly UNITS: ProductUnitEnum[] = Object.values(ProductUnitEnum);

  @Input() placeholderKeys?: DietEntityInfoPlaceholderKeys;
  @Input() displayUnits: boolean = false;
  @Input() infoFormGroup?: FormGroup;
}
