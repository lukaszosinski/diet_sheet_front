import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/services/product.service';
import { Product } from '../../api/models/product';
import { Nutrients } from '../../api/models/nutrients';

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
    this.productToAdd = this.createProduct();
  }

  private createProduct(): Product {
    return {
      id: null,
      name: '',
      nutrients: this.createNutrients(),
      kcal: 0,
    };
  }

  private createNutrients(): Nutrients {
    return {
      id: null,
      proteins: 0,
      carbs: 0,
      fat: 0,
      roughage: 0,
    };
  }
}
