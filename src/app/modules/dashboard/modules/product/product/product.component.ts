import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Product} from '../product.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../app.recuder';
import * as ProductActions from '../product.actions';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'diet-product',
  template: `
      <div class="product-details-wrapper">
          <div class="product-buttons">
              <button (click)="createProduct()"><span>+</span></button>
              <button><span>x</span></button>
          </div>
          <form [formGroup]="form">
              <input type="text" id="name" name="name" [formControlName]="'name'">
              <diet-product-summary [parentForm]="form"></diet-product-summary>
          </form>
      </div>
  `,
  styleUrls: [ './product.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  form: FormGroup = this.fb.group({});

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: 'Nowy produkt',
      summary: this.fb.group({
        kcal: 0,
        proteins: 0,
        carbs: 0,
        fat: 0
      })
    });
  }

  createProduct(): void {
    const product: Product = this.form.value;
    this.store.dispatch(ProductActions.postProduct({product}));
  }
}
