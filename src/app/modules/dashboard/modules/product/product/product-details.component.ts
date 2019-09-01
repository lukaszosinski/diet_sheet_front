import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.recuder';
import * as ProductActions from '../product.actions';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietEntityInfoPlaceholderKeys } from '../../../../diet-entity';


@Component({
  selector: 'diet-product-details',
  template: `
      <form class="product-details-wrapper" [formGroup]="form">
          <div class="product-details-header">
              <diet-square-cancel-button (click)="onCancelButtonClick()"></diet-square-cancel-button>
              <diet-square-confirm-button (click)="onConfirmButtonClick()"></diet-square-confirm-button>
          </div>
          <diet-entity-info
                  class="product-details-info"
                  [placeholderKeys]="PRODUCT_PLACEHOLDER_KEYS"
                  [displayUnits]="true"
                  [infoFormGroup]="form">
          </diet-entity-info>
          <diet-entity-item-table
                  class="product-details-prices-table"
                  [tableTitle]="'PRODUCT.PRICE' | translate"
                  [columnHeaders]="['PRODUCT.SHOP' | translate]"
                  [itemsFormArray]="getPricesForm()"
                  (addButtonClick)="onAddProductPriceClick()">
          </diet-entity-item-table>
          <diet-entity-summary
                  class="product-details-summary"
                  [summaryFormGroup]="getSummaryFormGroup()"></diet-entity-summary>
      </form>
  `,
  styleUrls: [ './product-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {

  readonly PRODUCT_PLACEHOLDER_KEYS: DietEntityInfoPlaceholderKeys = {
    name: 'PRODUCT.NAME_PLACEHOLDER',
    description: 'PRODUCT.DESCRIPTION_PLACEHOLDER',
  };
  form: FormGroup = this.fb.group({});

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: [ undefined, Validators.required ],
      description: undefined,
      unit: undefined,
      summary: this.fb.group({
        kcal: [ undefined, Validators.required ],
        proteins: [ undefined, Validators.required ],
        carbs: [ undefined, Validators.required ],
        fat: [ undefined, Validators.required ]
      }),
      prices: this.fb.array([]),
    });
  }

  getPricesForm(): FormArray {
    return this.form.get('prices') as FormArray;
  }

  onAddProductPriceClick(): void {
    console.log('Add product price');
  }

  getSummaryFormGroup(): FormGroup {
    return this.form.get('summary') as FormGroup;
  }

  onConfirmButtonClick(): void {
    const product: Product = this.form.value;
    this.store.dispatch(ProductActions.createProduct({ product }));
  }

  onCancelButtonClick(): void {
    console.log('Cancel button clicked');
  }
}
