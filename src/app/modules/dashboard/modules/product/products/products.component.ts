import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ProductService } from '../../../../../api/services/product.service';
import {Product} from '../product.model';
import {Store} from '@ngrx/store';
import * as ProductActions from '../product.actions';
import * as fromProduct from '../product.reducer';
import {AppState} from '../../../../../app.recuder';
import {Observable} from 'rxjs';


@Component({
  selector: 'diet-products',
  template: `
      <div class="container">
          <ul class="list-group">
              <li *ngFor="let product of (getProductList() | async)">{{product.name}}</li>
          </ul>
      </div>
      <diet-product></diet-product>
  `,
  styleUrls: [ './products.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  productToAdd: Product | undefined;

  constructor(private productService: ProductService,
              private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  getProductList(): Observable<Product[]> {
    return this.store.select(fromProduct.selectAll);
  }

  delete(product: Product): void {
    this.productService.deleteProduct(product).subscribe(() => {
      this.products = this.products.filter(p => p !== product);
    });
  }

  discard() {
    this.productToAdd = undefined;
  }

  update(product: Product) {
    this.productService.updateProduct(product).subscribe(() => {
      const indexToUpdate = this.products.findIndex(p => p.id === product.id);
      this.products[indexToUpdate] = product;
    });
  }

  post(): void {
    if (!this.productToAdd) {
      console.warn('Product to add is not defined');
      return;
    }
    this.productService.createProduct(this.productToAdd)
      .subscribe(product => {
        this.products.push(product);
        this.productToAdd = undefined;
      });
  }
}
