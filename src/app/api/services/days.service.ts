import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models/day';

@Injectable()
export class DaysService {

  private dayUrl = 'http://localhost:8080/day';

  constructor(private http: HttpClient) {}

  getDay(date: Date): Observable<Day> {
    // /days/byDate?date=12-08-2019
    // /days?from=12-08-2019&to=15-08-2019
    return this.http.get<Day>(this.dayUrl + '/byDate', { params: { date: date.toISOString() } });
  }

}
