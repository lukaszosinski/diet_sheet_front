import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../app.recuder';
import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import { DashboardNavigationService } from './dashboard-navigation/dashboard-navigation.service';
import { NavigationData } from './dashboard-navigation/navigation-data';

@Component({
  selector: 'diet-dashboard',
  template: `
      <div class="diet-dashboard">
          <div class="diet-dashboard-nav-bar-wrapper" [class.hidden]="!(shouldShowNavBar$ | async)">
              <diet-dashboard-nav-bar [show]="shouldShowNavBar$ | async" [items]="navigationData"></diet-dashboard-nav-bar>
              <diet-dashboard-nav-bar-trigger-button (click)="onNavBarToggled()"
              ></diet-dashboard-nav-bar-trigger-button>
          </div>
          <div id="diet-dashboard-content-wrapper" class="diet-dashboard-content-wrapper">
              <router-outlet></router-outlet>
          </div>
      </div>
  `,
  styleUrls: [ './dashboard.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {

  readonly navigationData: NavigationData[];
  readonly shouldShowNavBar$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>,
              dashboardNavigationService: DashboardNavigationService
  ) {
    this.shouldShowNavBar$ = this.store.select(fromDashboard.selectShouldShowNavBar);
    this.navigationData = dashboardNavigationService.getNavigationDataList();
  }

  onNavBarToggled(): void {
    this.store.dispatch(DashboardActions.triggerNavBar());
  }
}
