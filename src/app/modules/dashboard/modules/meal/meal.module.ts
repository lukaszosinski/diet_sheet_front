import { NgModule } from '@angular/core';
import { MealRoutingModule } from './meal-routing.module';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { SharedLazyModule } from '../../../shared/shared-lazy.module';
import { StoreModule } from '@ngrx/store';
import * as fromMeal from './meal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MealEffects } from './meal.effects';
import { DietEntityModule } from '../../../diet-entity/diet-entity.module';
import { ProductModule } from '../product/product.module';
import { SelectMealDialogComponent } from './select-meal-dialog/select-meal-dialog.component';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { MealListComponent } from './meal-list/meal-list.component';

@NgModule({
  declarations: [
    MealDetailsComponent,
    SelectMealDialogComponent,
    MealListComponent,
  ],
  imports: [
    MealRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromMeal.mealsFeatureKey, fromMeal.reducer),
    EffectsModule.forFeature([ MealEffects ]),
    DietEntityModule,
    ProductModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  entryComponents: [
    SelectMealDialogComponent
  ]
})
export class MealModule {
}
