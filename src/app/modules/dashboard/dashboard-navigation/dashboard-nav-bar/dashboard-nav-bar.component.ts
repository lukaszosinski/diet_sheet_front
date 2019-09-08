import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../../../app.recuder';
import { Store } from '@ngrx/store';
import { NavigationData } from '../navigation-data';
import * as fromAuthorization from '../../../authorization/authorization.actions';
import * as fromDashboard from '../../../dashboard/dashboard.actions';

@Component({
  selector: 'diet-dashboard-nav-bar',
  template: `
      <div class="diet-dashboard-nav-bar" *ngIf="show">
          <ul>
              <li *ngFor="let item of items" class="diet-dashboard-nav-bar-item">
                  <a (click)="redirect(item.navigationCallback)">
                      {{item.translationKey | translate}}
                  </a>
              </li>
          </ul>
          <div class="diet-dashboard-nav-bar-item">
              <a class="diet-dashboard-nav-bar-sign-out" (click)="signOut()">{{ 'DASHBOARD.NAVIGATION.SIGN_OUT' | translate }}</a>
          </div>
      </div>
  `,
  styleUrls: [ './dashboard-nav-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardNavBarComponent implements OnInit {

  @Input() items: NavigationData[] = [];
  @Input() show = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

  redirect(redirectCallback: () => Promise<boolean>): void {
    redirectCallback()
      .then(() => this.store.dispatch(fromDashboard.triggerNavBar()));
  }

  signOut(): void {
    this.store.dispatch(fromAuthorization.signOut());
  }
}
