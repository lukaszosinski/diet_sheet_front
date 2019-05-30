import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Product } from './api/models/product';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' },
    )
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:8080/product/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;
    return this.http.put<Product>(url, product, httpOptions);
  }

  addProduct(hero: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, hero, httpOptions);
  }
}
