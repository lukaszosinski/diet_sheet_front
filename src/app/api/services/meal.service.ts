import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../../modules/dashboard/modules/meal/meal.model';

@Injectable()
export class MealService {

  private mealsUrl = 'http://localhost:8080/meal';

  constructor(private http: HttpClient) {}

  getMeal(mealId: string): Observable<Meal> {
    const url = `${this.mealsUrl}/${mealId}`;
    return this.http.get<Meal>(url);
  }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.mealsUrl);
  }

}
