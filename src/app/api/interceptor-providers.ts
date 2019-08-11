import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationTokenHttpInterceptor } from './http-interceptors/authorization-token-http-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationTokenHttpInterceptor, multi: true },
];
