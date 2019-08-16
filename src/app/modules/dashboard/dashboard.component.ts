import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardNavBarData } from './dashboard-nav-bar/models/dashboard-nav-bar-data';
import { RoutingService } from '../shared/routing/routing.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../app.recuder';
import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';

@Component({
  selector: 'diet-dashboard',
  template: `
      <div class="diet-dashboard">
          <div class="diet-dashboard-nav-bar-wrapper">
              <diet-dashboard-nav-bar [show]="shouldShowNavBar$ | async"
                                      [items]="navBarData"
              ></diet-dashboard-nav-bar>
              <diet-dashboard-nav-bar-trigger-button
                      (triggered)="onNavBarTriggered()"
              ></diet-dashboard-nav-bar-trigger-button>
          </div>
          <div class="diet-dashboard-content-wrapper">
              <router-outlet></router-outlet>
          </div>
      </div>
  `,
  styleUrls: [ './dashboard.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  readonly navBarData: DashboardNavBarData[] = [
    {
      translationKey: 'DASHBOARD.NAVIGATION.MEALS',
      navigationCallback: this.routingService.navigation.dashboard.meals.list,
    },
    {
      translationKey: 'DASHBOARD.NAVIGATION.PRODUCTS',
      navigationCallback: this.routingService.navigation.dashboard.products.list,
    },
    {
      translationKey: 'DASHBOARD.NAVIGATION.DAY_PLAN',
      navigationCallback: this.routingService.navigation.dashboard.dayPlan(),
    },
  ];
  readonly shouldShowNavBar$: Observable<boolean>;

  constructor(private routingService: RoutingService,
              private store: Store<fromApp.AppState>
  ) {
    this.shouldShowNavBar$ = this.store.select(fromDashboard.selectShouldShowNavBar);
  }

  ngOnInit(): void { }

  onNavBarTriggered(): void {
    this.store.dispatch(DashboardActions.triggerNavBar());
  }
}
