import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from './models/user-data.model';
import { UserPreferences } from './models/user-preferences.model';
import { DietLimits } from './models/diet-limits.model';

@Injectable()
export class SettingsService {

  private baseUrl = 'api/user';

  constructor(private http: HttpClient) {}

  getUserData(id: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.baseUrl}/${id}`);
  }

  updateUserData(userData: UserData): Observable<UserData> {
    return this.http.put<UserData>(`${this.baseUrl}/${userData.id}`, userData);
  }

  getUserPreferences(id: number): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(`${this.baseUrl}/${id}`);
  }

  updateUserPreferences(userPreferences: UserPreferences): Observable<UserPreferences> {
    return this.http.put<UserPreferences>(`${this.baseUrl}/${userPreferences.id}`, userPreferences);
  }

  getUserDietLimits(id: number): Observable<DietLimits> {
    return this.http.get<DietLimits>(`${this.baseUrl}/${id}`);
  }

  updateUserDietLimits(dietLimits: DietLimits): Observable<DietLimits> {
    return this.http.put<DietLimits>(`${this.baseUrl}/${dietLimits.id}`, dietLimits);
  }

}

