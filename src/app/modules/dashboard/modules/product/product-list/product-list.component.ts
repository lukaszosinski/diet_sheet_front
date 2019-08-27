import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../api/services/product.service';
import { Product } from '../product.model';

@Component({
  selector: 'diet-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.scss' ]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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


}
