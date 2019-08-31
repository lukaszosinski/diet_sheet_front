import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ProductService } from '../../../../../api/services/product.service';
import {Product} from '../product.model';


@Component({
  selector: 'diet-products',
  template: `
      <diet-product></diet-product>
  `,
  styleUrls: [ './products.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  productToAdd: Product | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.downloadProducts();
  }

  downloadProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products || []);
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
