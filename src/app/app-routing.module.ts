import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'products', loadChildren: './product/product.module#ProductModule' },
  { path: 'meals', loadChildren: './meal/meal.module#MealModule' },
  { path: '', redirectTo: 'meals', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
