import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { catchApiError } from '../../../../api/api.actions';
import { ProductService } from '../../../../api/services/product.service';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { RoutingService } from '../../../shared/routing/routing.service';
import { ActivatedRoute } from '@angular/router';
import * as ProductActions from './product.actions';


@Injectable()
export class ProductEffects {

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProduct),
    mergeMap(({ id }) => this.productService.getProduct(id).pipe(
      map((product) => ProductActions.loadProductsSuccess({ products: [ product ] })),
      catchApiError(ProductActions.loadProductsError)
    ))
  ));

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    mergeMap(() => this.productService.getProducts().pipe(
      map((products) => ProductActions.loadProductsSuccess({ products })),
      catchApiError(ProductActions.loadProductsError)
    ))
  ));

  createProductAndRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.createProductAndRedirect),
    mergeMap(({ product }) => this.productService.createProduct(product).pipe(
      map((receivedProduct) => ProductActions.upsertProductSuccess({ product: receivedProduct })),
      tap(() => this.redirect()),
      catchApiError(ProductActions.upsertProductError)
    ))
  ));

  updateProductAndRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateProductAndRedirect),
    mergeMap(({ product }) => this.productService.updateProduct(product).pipe(
      map((receivedProduct) => ProductActions.upsertProductSuccess({ product: receivedProduct })),
      tap(() => this.redirect()),
      catchApiError(ProductActions.upsertProductError)
    ))
  ));

  redirectToProductDetails$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.redirectToProductDetails),
    tap(({ id, skipLocationChange, redirectUrl }) => this.goToProductDetails(id, skipLocationChange, redirectUrl))
  ), { dispatch: false });

  redirectFromProductDetails = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.redirectFromProductDetails),
    tap(() => this.redirect())
  ), { dispatch: false });

  constructor(private actions$: Actions,
              private productService: ProductService,
              private routingService: RoutingService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  private goToProductDetails(id?: number, skipLocationChange?: boolean, redirectUrl?: string): void {
    this.routingService.navigation.dashboard.products.details(id, skipLocationChange, redirectUrl);
  }

  private redirect(): Observable<boolean> {
    const { redirectUrl } = this.activatedRoute.snapshot.queryParams;
    const redirectPromise = redirectUrl
      ? this.routingService.navigateByUrl(redirectUrl)
      : this.routingService.navigation.dashboard.products.list();
    return fromPromise(redirectPromise);
  }

}
