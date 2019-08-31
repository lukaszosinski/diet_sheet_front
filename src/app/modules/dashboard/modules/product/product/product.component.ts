import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Product} from '../product.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../app.recuder';
import * as ProductActions from '../product.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'diet-product',
  template: `
      <div class="product-details-wrapper">
          <div class="product-buttons">
              <button (click)="createProduct()"><span>+</span></button>
              <button><span>x</span></button>
          </div>
          <form [formGroup]="form">
              <input type="text" name="name" formControlName="name">
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
      name: [undefined, Validators.required],
      summary: this.fb.group({
        kcal: [undefined, Validators.required],
        proteins: [undefined, Validators.required],
        carbs: [undefined, Validators.required],
        fat: [undefined, Validators.required]
      })
    });
  }

  createProduct(): void {
    const product: Product = this.form.value;
    this.store.dispatch(ProductActions.createProduct({product}));
  }
}
