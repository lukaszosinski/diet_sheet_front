import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import * as fromAuthorization from '../../../authorization/authorization.actions';
import { AppState } from '../../../../app.recuder';
import { Store } from '@ngrx/store';
import { NavigationData } from '../navigation-data';

@Component({
  selector: 'diet-dashboard-nav-bar',
  template: `
      <div class="diet-dashboard-nav-bar" *ngIf="show">
          <ul>
              <li *ngFor="let item of items">
                  <a (click)="redirect(item.navigationCallback)">
                      {{item.translationKey | translate}}
                  </a>
              </li>
          </ul>
          <a (click)="signOut()">{{ 'DASHBOARD.NAVIGATION.SIGN_OUT' | translate }}</a>
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
    redirectCallback();
  }

  signOut(): void {
    this.store.dispatch(fromAuthorization.signOut());
  }
}
