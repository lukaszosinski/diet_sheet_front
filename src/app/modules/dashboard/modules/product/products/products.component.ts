import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import * as ProductActions from '../product.actions';
import * as fromProduct from '../product.reducer';
import { AppState } from '../../../../../app.recuder';
import { Observable } from 'rxjs';


@Component({
  selector: 'diet-products',
  template: `
      <div class="container">
          <ul class="list-group">
              <li *ngFor="let product of (getProductList() | async)">{{product.name}}</li>
          </ul>
      </div>
  `,
  styleUrls: [ './products.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  getProductList(): Observable<Product[]> {
    return this.store.select(fromProduct.selectAll);
  }
}
