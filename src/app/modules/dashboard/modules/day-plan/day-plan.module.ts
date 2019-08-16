import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayPlanRoutingModule } from './day-plan-routing.module';
import { DayPlanComponent } from './day-plan.component';


@NgModule({
  declarations: [
    DayPlanComponent,
  ],
  imports: [
    CommonModule,
    DayPlanRoutingModule,
  ]
})
export class DayPlanModule {
}
