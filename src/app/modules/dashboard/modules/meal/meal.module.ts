import { NgModule } from '@angular/core';
import { MealRoutingModule } from './meal-routing.module';
import { MealsComponent } from './meals/meals.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { SharedLazyModule } from '../../../shared/shared-lazy.module';
import { StoreModule } from '@ngrx/store';
import * as fromMeal from './meal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MealEffects } from './meal.effects';

@NgModule({
  declarations: [
    MealsComponent,
    MealDetailsComponent,
  ],
  imports: [
    MealRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromMeal.mealsFeatureKey, fromMeal.reducer),
    EffectsModule.forFeature([ MealEffects ]),
  ]
})
export class MealModule {
}
