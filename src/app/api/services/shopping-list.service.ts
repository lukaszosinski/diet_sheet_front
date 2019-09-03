import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShoppingList} from '../../modules/dashboard/modules/shopping-list/shopping-list.model';

@Injectable()
export class ShoppingListService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  generateShoppingListForDateRange(dateFrom: Date, dateTo: Date): Observable<ShoppingList> {
    const params = { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() };
    return this.http.get<ShoppingList>(this.baseUrl + 'shoppingListForDays', { params });
  }

  saveShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(this.baseUrl + 'shoppingList', shoppingList);
  }
}
