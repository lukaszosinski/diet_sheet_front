import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState } from '../../app.recuder';
import { Store } from '@ngrx/store';
import * as fromAuthorization from '../../modules/authorization/authorization.reducer';
import { OnDestroyAbstract } from '../../modules/shared/utils/abstract-injectables/on-destroy-abstract';
import { NgrxUtils } from '../../modules/shared/utils/ngrx-utils';


@Injectable()
export class AuthorizationTokenHttpInterceptor extends OnDestroyAbstract implements HttpInterceptor {

  private readonly authToken$: BehaviorSubject<string | undefined>;

  constructor(store: Store<AppState>) {
    super();
    this.authToken$ = NgrxUtils.selectAsBehaviourSubject(store, this, fromAuthorization.selectAuthorizationToken);
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authToken$.getValue();
    if (authToken !== undefined) {
      const authorizedRequest = req.clone({ setHeaders: { Authorization: authToken } });
      return next.handle(authorizedRequest);
    }
    return next.handle(req);
  }
}
