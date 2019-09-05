import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayPlanComponent } from './day-plan.component';


const routes: Routes = [
  { path: `:${DayPlanComponent.SELECTED_DATE_PATH_PARAM}`, component: DayPlanComponent },
  { path: ``, component: DayPlanComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DayPlanRoutingModule {
}
