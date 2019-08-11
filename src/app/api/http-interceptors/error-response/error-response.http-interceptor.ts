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

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const { status } = error;
        if (status === 401) {
          this.store.dispatch(ErrorResponseActions.unauthorized);
        }
        return throwError(error);
      })
    );
  }
}
