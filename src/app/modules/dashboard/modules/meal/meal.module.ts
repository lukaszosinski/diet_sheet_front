import { NgModule } from '@angular/core';
import { MealRoutingModule } from './meal-routing.module';
import { MealsComponent } from './meals/meals.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { SharedLazyModule } from '../../../shared/shared-lazy.module';
import { StoreModule } from '@ngrx/store';
import * as fromMeal from './meal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MealEffects } from './meal.effects';
import { MealWithSummaryComponent } from './meal-with-summary/meal-with-summary.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    MealsComponent,
    MealDetailsComponent,
    SummaryComponent,
    MealWithSummaryComponent,
  ],
  imports: [
    MealRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromMeal.mealsFeatureKey, fromMeal.reducer),
    EffectsModule.forFeature([ MealEffects ]),
  ],
  exports: [
    MealWithSummaryComponent,
    SummaryComponent,
  ]
})
export class MealModule {
}
