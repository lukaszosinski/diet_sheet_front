import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealListComponent } from './meal-list/meal-list.component';

const routes: Routes = [
  { path: 'create', component: MealDetailsComponent },
  { path: ':mealId', component: MealDetailsComponent },
  { path: '', component: MealListComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MealRoutingModule {
}
