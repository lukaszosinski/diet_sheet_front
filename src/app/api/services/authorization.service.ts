import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class AuthorizationService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signUp(body: { username: string, password: string }): Observable<User & { token: string }> {
    return this.http.post<User & { token: string }>(this.baseUrl + 'public/user', body);
  }

  signIn(body: { username: string, password: string }): Observable<User & { token: string }> {
    return this.http.post<User & { token: string }>(this.baseUrl + 'public/session', body, {});
  }

  signOut(): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + 'session', {});
  }
}
