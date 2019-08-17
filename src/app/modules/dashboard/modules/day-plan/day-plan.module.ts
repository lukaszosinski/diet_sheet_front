import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayPlanRoutingModule } from './day-plan-routing.module';
import { DayPlanComponent } from './day-plan.component';
import { SharedLazyModule } from '../../../shared/shared-lazy.module';
import { StoreModule } from '@ngrx/store';
import * as fromDayPlan from './day-plan.reducer';
import { DayPlanCalendarComponent } from './components/day-plan-calendar/day-plan-calendar.component';
import { DayPlanMealComponent } from './components/day-plan-meal/day-plan-meal.component';
import { DayPlanStatsComponent } from './components/day-plan-stats/day-plan-stats.component';


@NgModule({
  declarations: [
    DayPlanComponent,
    DayPlanCalendarComponent,
    DayPlanMealComponent,
    DayPlanStatsComponent,
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
