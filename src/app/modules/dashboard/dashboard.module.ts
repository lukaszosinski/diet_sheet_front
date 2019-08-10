import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavBarComponent } from './dashboard-nav-bar/dashboard-nav-bar.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardNavBarTriggerButtonComponent } from './dashboard-nav-bar/dashboard-nav-bar-trigger-button/dashboard-nav-bar-trigger-button.component';


@NgModule({
  declarations: [ DashboardComponent, DashboardNavBarComponent, DashboardNavBarTriggerButtonComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedLazyModule,
    SharedModule,
  ]
})
export class DashboardModule {
}
