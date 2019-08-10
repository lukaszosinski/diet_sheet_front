import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  signUp(): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>('public/user', {}, {});
  }

  signIn(): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>('public/session', {}, {});
  }

  signOut(): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>('session', {});
  }
}
