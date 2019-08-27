import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedLazyModule } from '../../../shared/shared-lazy.module';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ ProductEffects ])
  ],
})
export class ProductModule {
}
