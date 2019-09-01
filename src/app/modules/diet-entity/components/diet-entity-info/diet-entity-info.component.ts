import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DietEntityInfoPlaceholderKeys } from './diet-entity-info-placeholder-keys';
import { GranularityEnum } from '../../../dashboard/modules/product/granularity.enum';

@Component({
  selector: 'diet-entity-info',
  template: `
      <div class="diet-entity-info" [formGroup]="infoFormGroup" [class.diet-entity-info--short]="!displayUnits">
          <input class="diet-entity-info-name" name="name" formControlName="name" [placeholder]="placeholderKeys.name | translate">
          <select *ngIf="displayUnits"
                  [value]="UNITS[0]"
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

  readonly UNITS: GranularityEnum[] = Object.values(GranularityEnum);

  @Input() placeholderKeys?: DietEntityInfoPlaceholderKeys;
  @Input() displayUnits: boolean = false;
  @Input() infoFormGroup?: FormGroup;
}
