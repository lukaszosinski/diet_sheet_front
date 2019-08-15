import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState } from '../../app.recuder';
import { Store } from '@ngrx/store';
import * as fromAuthorization from '../../modules/authorization/authorization.reducer';
import { first, switchMap } from 'rxjs/operators';


@Injectable()
export class AuthorizationTokenHttpInterceptor implements HttpInterceptor {


  constructor(private store: Store<AppState>) {
  }

  private getAuthToken(): Observable<string | undefined> {
    return this.store.select(fromAuthorization.selectAuthorizationToken).pipe(first());
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.getAuthToken().pipe(
      switchMap(Authorization => {
        if (Authorization === undefined) {
          return next.handle(request);
        }
        const authorizedRequest = request.clone({ setHeaders: { Authorization } });
        return next.handle(authorizedRequest);
      })
    );
  }
}
