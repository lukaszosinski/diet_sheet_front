import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavBarComponent } from './dashboard-nav-bar/dashboard-nav-bar.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';
// tslint:disable-next-line:max-line-length
import { DashboardNavBarTriggerButtonComponent } from './dashboard-nav-bar/dashboard-nav-bar-trigger-button/dashboard-nav-bar-trigger-button.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';


@NgModule({
  declarations: [ DashboardComponent, DashboardNavBarComponent, DashboardNavBarTriggerButtonComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromDashboard.dashboardFeatureKey, fromDashboard.reducer),
  ]
})
export class DashboardModule {
}
