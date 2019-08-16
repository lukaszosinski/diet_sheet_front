import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayPlanComponent } from './day-plan.component';


const routes: Routes = [
  { path: '', component: DayPlanComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DayPlanRoutingModule {
}
