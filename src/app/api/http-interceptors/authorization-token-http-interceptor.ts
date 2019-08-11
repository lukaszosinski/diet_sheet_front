import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { AppState } from '../../app.recuder';
import { Store } from '@ngrx/store';
import * as fromAuthorization from '../../modules/authorization/authorization.reducer';
import { takeUntil } from 'rxjs/operators';


@Injectable()
export class AuthorizationTokenHttpInterceptor implements HttpInterceptor, OnDestroy {

  private onDestroy$ = new Subject<void>();
  private authToken: string | undefined;

  constructor(store: Store<AppState>) {
    store.select(fromAuthorization.selectAuthorizationToken)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((authToken: string | undefined) => this.authToken = authToken);
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authToken !== undefined) {
      const authorizedRequest = req.clone({ setHeaders: { Authorization: this.authToken } });
      return next.handle(authorizedRequest);
    }
    return next.handle(req);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
