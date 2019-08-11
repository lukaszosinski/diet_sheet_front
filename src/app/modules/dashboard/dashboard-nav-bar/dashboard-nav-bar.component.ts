import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DashboardNavBarData } from './models/dashboard-nav-bar-data';
import * as fromAuthorization from '../../authorization/authorization.actions';
import { AppState } from '../../../app.recuder';
import { Store } from '@ngrx/store';

@Component({
  selector: 'diet-dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styleUrls: [ './dashboard-nav-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardNavBarComponent implements OnInit {

  @Input() items: DashboardNavBarData[] = [];
  @Input() show = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() { }

  redirect(redirectCallback: () => Promise<boolean>) {
    redirectCallback();
  }

  signOut(): void {
    this.store.dispatch(fromAuthorization.signOut());
  }
}
