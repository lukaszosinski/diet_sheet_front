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
import { EffectsModule } from '@ngrx/effects';
import { DayPlanEffects } from './day-plan.effects';
import { StatsMeterComponent } from './components/stats-metter/stats-meter.component';
import { MatDialogModule } from '@angular/material';
import { AddMealDialogComponent } from './components/add-meal-dialog/add-meal-dialog.component';
import { MealModule } from '../meal/meal.module';


@NgModule({
  declarations: [
    DayPlanComponent,
    DayPlanCalendarComponent,
    DayPlanMealComponent,
    DayPlanStatsComponent,
    AddMealDialogComponent,
    StatsMeterComponent,
  ],
  imports: [
    CommonModule,
    DayPlanRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromDayPlan.dayPlanFeatureKey, fromDayPlan.reducer),
    EffectsModule.forFeature([ DayPlanEffects ]),
    MatDialogModule,
    MealModule,
  ],
  entryComponents: [
    AddMealDialogComponent,
  ]
})
export class DayPlanModule {
}
