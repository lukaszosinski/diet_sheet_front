import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product } from './product.model';
import { createApiErrorAction } from '../../../../api/api.actions';


export const loadProducts = createAction('[Product/API] Load Products');

export const loadProductsSuccess = createAction('[Product/API] Load Products SUCCESS', props<{ products: Product[] }>());

export const loadProductsError = createApiErrorAction('[Product/API] Load Products ERROR', 'PRODUCT.LOAD_ERROR');

export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());

export const upsertProduct = createAction('[Product] Upsert Product', props<{ product: Product }>());

export const addProducts = createAction('[Product] Add Products', props<{ products: Product[] }>());

export const upsertProducts = createAction('[Product] Upsert Products', props<{ products: Product[] }>());

export const updateProduct = createAction('[Product] Update Product', props<{ product: Update<Product> }>());

export const updateProducts = createAction('[Product] Update Products', props<{ products: Update<Product>[] }>());

export const deleteProduct = createAction('[Product] Delete Product', props<{ id: string }>());

export const deleteProducts = createAction('[Product] Delete Products', props<{ ids: string[] }>());

export const clearProducts = createAction('[Product] Clear Products');

export const redirectFromProductDetails = createAction('[Meal] Redirect from Product details view', props<{ createdMealId?: number }>());

export const redirectToProductDetails = createAction(
  '[Meal] Redirect to Product details view',
  props<{ id?: number, skipLocationChange?: boolean, redirectUrl?: string }>()
);

export const createProduct = createAction('[Product] Create Product', props<{product: Product}>());
export const createProductSuccess = createAction('[Product/API] Create Product SUCCESS', props<{ product: Product }>());
export const createProductError = createApiErrorAction('[Product/API] Create Products ERROR', 'PRODUCT.CREATE_ERROR');
