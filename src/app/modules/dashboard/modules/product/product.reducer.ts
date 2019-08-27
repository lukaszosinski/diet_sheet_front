import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from './product.model';
import * as ProductActions from './product.actions';
import * as fromApp from '../../../../app.recuder';

export const productsFeatureKey = 'products';

export interface State extends EntityState<Product> {
  processing: {
    loadProducts: boolean;
  };
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: State = adapter.getInitialState({
  processing: {
    loadProducts: false,
  }
});

const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.upsertProduct,
    (state, action) => adapter.upsertOne(action.product, state)
  ),
  on(ProductActions.addProducts,
    (state, action) => adapter.addMany(action.products, state)
  ),
  on(ProductActions.upsertProducts,
    (state, action) => adapter.upsertMany(action.products, state)
  ),
  on(ProductActions.updateProduct,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.updateProducts,
    (state, action) => adapter.updateMany(action.products, state)
  ),
  on(ProductActions.deleteProduct,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProducts,
    (state, action) => adapter.removeMany(action.ids, state)
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
  on(ProductActions.clearProducts,
    state => adapter.removeAll(state)
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
