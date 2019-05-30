import { NgModule } from '@angular/core';

import { MealRoutingModule } from './meal-routing.module';
import { MealsComponent } from './meals/meals.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [
    MealsComponent,
    MealDetailsComponent,
  ],
  imports: [
    MealRoutingModule,
    SharedModule,
    ProductModule,
  ]
})
export class MealModule {}
