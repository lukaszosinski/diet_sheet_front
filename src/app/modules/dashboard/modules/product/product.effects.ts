import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import {map, mergeMap} from 'rxjs/operators';
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

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.createProduct),
    mergeMap(({product}) => this.productService.createProduct(product).pipe(
      map((product) => ProductActions.createProductSuccess({ product })),
      catchApiError(ProductActions.createProductError)
    ))
  ));

  constructor(private actions$: Actions,
              private productService: ProductService,
  ) {
  }

}
