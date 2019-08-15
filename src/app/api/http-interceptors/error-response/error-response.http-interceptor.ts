import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.recuder';
import * as ErrorResponseActions from './error-response.actions';

@Injectable()
export class ErrorResponseHttpInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const { status } = error;
        if (status === 401) {
          this.store.dispatch(ErrorResponseActions.unauthorized(error));
        }
        return throwError(error);
      })
    );
  }
}
