import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  signUp({ username, password }: Partial<User>): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(environment.apiUrl + 'public/user', { username, password }, {});
  }

  signIn({ username, password }: Partial<User>): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(environment.apiUrl + 'public/session', { username, password }, {});
  }

  signOut(): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(environment.apiUrl + 'session', {});
  }
}
