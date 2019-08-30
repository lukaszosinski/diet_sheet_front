import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import { catchApiError } from '../../../../api/api.actions';
import { ProductService } from '../../../../api/services/product.service';


@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    mergeMap(() => this.productService.getProducts().pipe(
      map((products) => ProductActions.loadProductsSuccess({ products })),
      catchApiError(ProductActions.loadProductsError)
    ))
  ));

  postProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.postProduct),
    mergeMap(({product}) => this.productService.postProduct(product).pipe(
      switchMap(productToAdd => [
        ProductActions.addProduct({product: productToAdd}),
        ProductActions.postProductSuccess()
      ]),
      catchApiError(ProductActions.postProductError)
    ))
  ));

  constructor(private actions$: Actions,
              private productService: ProductService,
  ) {
  }

}
