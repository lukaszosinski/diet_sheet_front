import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { SharedLazyModule } from '../../../shared/shared-lazy.module';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';
import { DietEntityModule } from '../../../diet-entity/diet-entity.module';
import { ProductDetailsComponent } from './product/product-details.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsComponent,
  ],
  imports: [
    ProductRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ ProductEffects ]),
    DietEntityModule
  ],
})
export class ProductModule {
}
