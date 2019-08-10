import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardNavBarData } from './dashboard-nav-bar/models/dashboard-nav-bar-data';
import { RoutingService } from '../shared/routing/routing.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../app.recuder';
import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import { signIn, signUp } from '../authorization/authorization.actions';

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
          <button (click)="signIn()">signIn</button>
          <button (click)="signUp()">signUp</button>
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
  ];
  readonly shouldShowNavBar$: Observable<boolean>;

  constructor(private routingService: RoutingService,
              private store: Store<fromApp.AppState>
  ) {
    this.shouldShowNavBar$ = this.store.select(fromDashboard.selectShouldShowNavBar);
  }

  ngOnInit() { }

  onNavBarTriggered() {
    this.store.dispatch(DashboardActions.triggerNavBar());
  }

  // TODO MOVE
  signIn() {
    this.store.dispatch(signIn({ username: 'asdasdas', password: 'asdasdasdasdasd' }));
  }

  signUp() {
    this.store.dispatch(signUp({ username: 'asdasdas', password: 'asdasdasdasdasd' }));
  }
}
