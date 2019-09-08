import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';
import { createApiErrorAction } from '../../../../api/api.actions';

export const loadProduct = createAction('[Product/API] Load Product', props<{ id: number }>());

export const loadProducts = createAction('[Product/API] Load Products');

export const loadProductsSuccess = createAction('[Product/API] Load Products SUCCESS', props<{ products: Product[] }>());

export const loadProductsError = createApiErrorAction('[Product/API] Load Products ERROR', 'PRODUCT.LOAD_ERROR');

export const deleteProduct = createAction('[Product] Delete Product', props<{ id: string }>());

export const redirectFromProductDetails = createAction('[Meal] Redirect from Product details view', props<{ createdMealId?: number }>());

export const redirectToProductDetails = createAction(
  '[Meal] Redirect to Product details view',
  props<{ id?: number, skipLocationChange?: boolean, redirectUrl?: string }>()
);

export const createProductAndRedirect = createAction('[Product/API] Create Product and redirect', props<{ product: Product }>());

export const updateProductAndRedirect = createAction('[Product/API] Update Product and redirect', props<{ product: Product }>());

export const upsertProductSuccess = createAction('[Product/API] Upsert Product SUCCESS', props<{ product: Product }>());

export const upsertProductError = createApiErrorAction('[Product/API] Upsert Products ERROR', 'PRODUCT.UPSERT_ERROR');
