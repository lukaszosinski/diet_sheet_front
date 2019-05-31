import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals/meals.component';

const routes: Routes = [
  { path: '', component: MealsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealRoutingModule {}
