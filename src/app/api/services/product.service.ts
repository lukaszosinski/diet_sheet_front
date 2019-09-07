import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Product } from '../../modules/dashboard/modules/product/product.model';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' },
  )
};

@Injectable()
export class ProductService {

  private baseUrl = 'api/product/';

  constructor(private http: HttpClient) {}

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Product>(url, product, httpOptions);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product, httpOptions);
  }
}
