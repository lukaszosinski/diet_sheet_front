import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models/day';

@Injectable()
export class DaysService {

  private dayUrl = 'http://localhost:8080/day';

  constructor(private http: HttpClient) {}

  getDaysInRange(dateFrom: Date, dateTo: Date): Observable<Day[]> {
    const params = { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() };
    return this.http.get<Day[]>(this.dayUrl, { params });
  }

  putDay(day: Day): Observable<Day> {
    return this.http.put<Day>(this.dayUrl + '/' + day.id.toString(), day);
  }

  createDay(day: Partial<Day>): Observable<Day> {
    return this.http.post<Day>(this.dayUrl, day);
  }
}
