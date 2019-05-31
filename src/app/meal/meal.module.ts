import { NgModule } from '@angular/core';

import { MealRoutingModule } from './meal-routing.module';
import { MealsComponent } from './meals/meals.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';

@NgModule({
  declarations: [
    MealsComponent,
    MealDetailsComponent,
  ],
  imports: [
    MealRoutingModule,
    SharedLazyModule,
  ]
})
export class MealModule {}
