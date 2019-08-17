import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../api/models/product';
import { ProductService } from '../../../../../api/services/product.service';
import { Summary } from '../../../../../api/models/summary';

@Component({
  selector: 'diet-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
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
    this.productService.addProduct(this.productToAdd)
      .subscribe(product => {
        this.products.push(product);
        this.productToAdd = undefined;
      });
  }

  add(): void {
    this.productToAdd = this.createProduct();
  }

  private createProduct(): Product {
    return {
      id: undefined,
      name: '',
      nutrients: this.createNutrients(),
      kcal: 0,
    };
  }

  private createNutrients(): Summary {
    return {
      id: undefined,
      proteins: 0,
      carbs: 0,
      fat: 0,
      roughage: 0,
    };
  }
}
