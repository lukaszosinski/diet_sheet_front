import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShoppingList} from '../../modules/dashboard/modules/shopping-list/shopping-list.model';

@Injectable()
export class ShoppingListService {

  private readonly baseUrl = '/api/';

  constructor(private http: HttpClient) { }

  getShoppingLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(this.baseUrl + 'shoppingList');
  }

  getShoppingList(id: number): Observable<ShoppingList> {
    const url = `${this.baseUrl}shoppingList/${id}`;
    return this.http.get<ShoppingList>(url);
  }

  generateShoppingListForDateRange(dateFrom: Date, dateTo: Date): Observable<ShoppingList> {
    const params = { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() };
    return this.http.get<ShoppingList>(this.baseUrl + 'shoppingListForDays', { params });
  }

  saveShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(this.baseUrl + 'shoppingList', shoppingList);
  }

  updateShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return this.http.put<ShoppingList>(this.baseUrl + 'shoppingList/' + shoppingList.id, shoppingList);
  }
}
