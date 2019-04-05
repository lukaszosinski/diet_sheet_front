import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {MealsComponent} from "./meals/meals.component";

const routes: Routes = [
  {path: '', redirectTo: '/meals', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'meals', component: MealsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
