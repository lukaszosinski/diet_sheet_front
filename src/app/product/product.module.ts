import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedLazyModule,
  ],
})
export class ProductModule {}
