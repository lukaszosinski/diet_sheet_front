import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule,
  ],
  exports: [
    ProductComponent,
    ProductsComponent,
    ProductListComponent
  ]
})
export class ProductModule {}
