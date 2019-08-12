import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../app.recuder';
import * as fromAuthorization from '../modules/authorization/authorization.reducer';
import { Store } from '@ngrx/store';
import { RoutingService } from '../modules/shared/routing/routing.service';
import { selectFirst } from '../modules/shared/utils/ngrx-utils';

export class DashboardActivationGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private routingService: RoutingService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized()
      .toPromise()
      .then((isAuthorized: boolean) => {
        if (isAuthorized) {
          return true;
        }
        return this.routingService.navigation.landingPage.go();
      });
  }

  private isAuthorized(): Observable<boolean> {
    return selectFirst(this.store, fromAuthorization.isAuthorized);
  }

}
