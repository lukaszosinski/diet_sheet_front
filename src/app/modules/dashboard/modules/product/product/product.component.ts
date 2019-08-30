import {ChangeDetectionStrategy, Component} from '@angular/core';
import {getEmptyProduct, Product} from '../product.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../app.recuder';
import * as ProductActions from '../product.actions';

@Component({
  selector: 'diet-product',
  template: `
      <div class="product-details-wrapper">
          <div class="product-buttons">
              <button (click)="createProduct()"><span>+</span></button>
              <button><span>x</span></button>
          </div>
          <label>
              <input type="text" [(ngModel)]="product.name"/>
          </label>
          <diet-product-summary [summary]="product.summary"></diet-product-summary>
      </div>
  `,
  styleUrls: [ './product.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

  product: Product;

  constructor(private store: Store<AppState>) {
    this.product = getEmptyProduct();
  }

  createProduct(): void {
    if (!!this.product) {
      this.store.dispatch(ProductActions.postProduct({product: this.product}));
    }
    this.product = getEmptyProduct();
  }
}
