import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayPlanRoutingModule } from './day-plan-routing.module';
import { DayPlanComponent } from './day-plan.component';
import { SharedLazyModule } from '../../../shared/shared-lazy.module';
import { StoreModule } from '@ngrx/store';
import * as fromDayPlan from './day-plan.reducer';


@NgModule({
  declarations: [
    DayPlanComponent,
  ],
  imports: [
    CommonModule,
    DayPlanRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromDayPlan.dayPlanFeatureKey, fromDayPlan.reducer)
  ]
})
export class DayPlanModule {
}
