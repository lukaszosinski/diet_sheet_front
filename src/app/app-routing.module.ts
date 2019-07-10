import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'meals', loadChildren: () => import('./meal/meal.module').then(m => m.MealModule)},
  {path: '', redirectTo: 'meals', pathMatch: 'full'},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
