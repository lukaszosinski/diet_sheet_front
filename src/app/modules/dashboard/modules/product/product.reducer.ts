import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from './product.model';
import * as ProductActions from './product.actions';
import * as fromApp from '../../../../app.recuder';

export const productsFeatureKey = 'products';

export interface State extends EntityState<Product> {
  processing: {
    loadProducts: boolean;
    upsertProduct: boolean;
  };
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: State = adapter.getInitialState({
  processing: {
    loadProducts: false,
    upsertProduct: false,
  }
});

const productReducer = createReducer(
  initialState,
  on(ProductActions.deleteProduct,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.loadProducts,
    (state) => ({ ...state, processing: { ...state.processing, loadProducts: true } })
  ),
  on(ProductActions.loadProductsError,
    (state) => ({ ...state, processing: { ...state.processing, loadProducts: false } })
  ),
  on(ProductActions.loadProductsSuccess,
    (state, action) => ({ ...adapter.upsertMany(action.products, state), processing: { ...state.processing, loadProducts: false } })
  ),
  on(
    ProductActions.createProductAndRedirect,
    ProductActions.updateProductAndRedirect,
    (state) => ({
      ...state, processing: { ...state.processing, upsertProduct: true }
    })
  ),
  on(ProductActions.upsertProductSuccess,
    (state, action) => adapter.upsertOne(action.product, {
      ...state,
      processing: { ...state.processing, upsertProduct: false }
    })
  ),
  on(ProductActions.upsertProductError,
    (state) => ({
      ...state, processing: { ...state.processing, upsertProduct: false }
    })
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return productReducer(state, action);
}

export const selectProduct = createFeatureSelector<fromApp.AppState, State>(productsFeatureKey);

export const selectAll = createSelector(
  selectProduct,
  adapter.getSelectors().selectAll
);


export const selectEntities = createSelector(
  selectProduct,
  adapter.getSelectors().selectEntities
);

export const selectProductById = (id: number) => createSelector(
  selectEntities,
  (entities) => entities[id]
);
