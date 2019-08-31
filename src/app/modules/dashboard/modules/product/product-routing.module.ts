import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product/product-details.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'create', component: ProductDetailsComponent },
  { path: ':productId', component: ProductDetailsComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductRoutingModule {
}
