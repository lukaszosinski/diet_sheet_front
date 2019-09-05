import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../../modules/dashboard/modules/meal/meal.model';

@Injectable()
export class MealService {

  private baseUrl = 'api/meal';

  constructor(private http: HttpClient) {}

  getMeal(mealId: string): Observable<Meal> {
    const url = `${this.baseUrl}/${mealId}`;
    return this.http.get<Meal>(url);
  }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.baseUrl);
  }

  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.baseUrl, meal);
  }

  updateMeal(meal: Meal): Observable<Meal> {
    const url = `${this.baseUrl}/${meal.id}`;
    return this.http.put<Meal>(url, meal);
  }
}
