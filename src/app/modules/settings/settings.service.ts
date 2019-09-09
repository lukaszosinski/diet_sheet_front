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

  getUserData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.baseUrl}/data`);
  }

  updateUserData(userData: UserData): Observable<UserData> {
    return this.http.put<UserData>(`${this.baseUrl}/data`, userData);
  }

  getUserPreferences(): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(`${this.baseUrl}/preferences`);
  }

  updateUserPreferences(userPreferences: UserPreferences): Observable<UserPreferences> {
    return this.http.put<UserPreferences>(`${this.baseUrl}/preferences`, userPreferences);
  }

  getUserDietLimits(): Observable<DietLimits> {
    return this.http.get<DietLimits>(`${this.baseUrl}/dietLimits`);
  }

  updateUserDietLimits(dietLimits: DietLimits): Observable<DietLimits> {
    return this.http.put<DietLimits>(`${this.baseUrl}/dietLimits`, dietLimits);
  }

}

