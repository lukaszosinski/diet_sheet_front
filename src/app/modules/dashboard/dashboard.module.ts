import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavBarComponent } from './dashboard-navigation/dashboard-nav-bar/dashboard-nav-bar.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';
// tslint:disable-next-line:max-line-length
import { DashboardNavBarTriggerButtonComponent } from './dashboard-navigation/dashboard-nav-bar-trigger-button/dashboard-nav-bar-trigger-button.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';
import { DashboardScrollPositionService } from './dashboard-scroll-position.service';
import { FridgeComponent } from './dashboard-navigation/fridge/fridge.component';
import { DashboardNavigationService } from './dashboard-navigation/dashboard-navigation.service';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavBarComponent,
    DashboardNavBarTriggerButtonComponent,
    FridgeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedLazyModule,
    StoreModule.forFeature(fromDashboard.dashboardFeatureKey, fromDashboard.reducer),
  ],
  providers: [
    DashboardNavigationService,
    DashboardScrollPositionService,
  ]
})
export class DashboardModule {
}
