import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
  { path: 'meals', loadChildren: () => import('./modules/meal/meal.module').then(m => m.MealModule) },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {
}
