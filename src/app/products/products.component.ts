import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  productToAdd: Product;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        if (products !== null) {
          this.products = products;
        }
      });
  }

  delete(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.products = this.products.filter(p => p !== product);
    });
  }

  discard() {
    this.productToAdd = null;
  }

  update(product: Product) {
    this.productService.updateProduct(product).subscribe(() => {
      const indexToUpdate = this.products.findIndex(p => p.id === product.id);
      this.products[indexToUpdate] = product;
    });
  }

  post(): void {
    this.productService.addProduct(this.productToAdd)
      .subscribe(product => {
        this.products.push(product);
        this.productToAdd = null;
      });
  }

  add(): void {
    this.productToAdd = new Product();
  }
}
