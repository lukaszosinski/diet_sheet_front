import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationTokenHttpInterceptor } from './http-interceptors/authorization-token.http-interceptor';
import { ErrorResponseHttpInterceptor } from './http-interceptors/error-response/error-response.http-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationTokenHttpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseHttpInterceptor, multi: true },
];
