import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromApp from '../../../../app.recuder';
import * as ShoppingListActions from '../shopping-list/shopping-list.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ShoppingList } from './shopping-list.model';


export const shoppingListFeatureKey = 'shoppingList';

export interface State extends EntityState<ShoppingList> {
  generatedShoppingList?: ShoppingList;
  processing: {
    upsertShoppingList: boolean,
    loadShoppingLists: boolean,
  };
}

export const adapter: EntityAdapter<ShoppingList> = createEntityAdapter<ShoppingList>();

export const initialState: State = adapter.getInitialState({
  generatedShoppingList: undefined,
  processing: {
    upsertShoppingList: false,
    loadShoppingLists: false,
  }
});

const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.generateShoppingListSuccess,
    (state, { shoppingList }) => ({ ...state, generatedShoppingList: shoppingList })),
  on(ShoppingListActions.saveShoppingListAndRedirect, (state) => ({
    ...state,
    processing: { ...state.processing, upsertShoppingList: true }
  })),
  on(ShoppingListActions.updateShoppingListAndRedirect, (state) => ({
    ...state,
    processing: { ...state.processing, upsertShoppingList: true }
  })),
  on(ShoppingListActions.upsertShoppingListSuccess, (state, { shoppingList }) => ({
    ...adapter.upsertOne(shoppingList, state),
    processing: { ...state.processing, upsertShoppingList: false },
    })
  ),
  on(ShoppingListActions.upsertShoppingListError, (state) => ({
    ...state,
    processing: { ...state.processing, upsertShoppingList: false }
  })),
  on(ShoppingListActions.loadShoppingLists, (state) => ({ ...state, processing: { ...state.processing, loadShoppingLists: true } })),
  on(ShoppingListActions.loadShoppingListsSuccess, (state, { shoppingLists }) => ({
    ...adapter.upsertMany(shoppingLists, state),
    processing: { ...state.processing, loadShoppingLists: false }
    })
  ),
  on(ShoppingListActions.loadShoppingListsError, (state) => ({ ...state, processing: { ...state.processing, loadShoppingLists: false } })),
  on(ShoppingListActions.loadShoppingList, (state) => ({ ...state, processing: { ...state.processing, loadShoppingLists: true } })),
);

export function reducer(state: State | undefined, action: Action): State {
  return shoppingListReducer(state, action);
}

export const selectShoppingList = createFeatureSelector<fromApp.AppState, State>(shoppingListFeatureKey);

export const selectGeneratedShoppingList = createSelector(
  selectShoppingList,
  (state) => state.generatedShoppingList
);

export const selectAll = createSelector(
  selectShoppingList,
  adapter.getSelectors().selectAll
);

export const selectEntities = createSelector(
  selectShoppingList,
  adapter.getSelectors().selectEntities
);

export const selectShoppingListById = (id: number) => createSelector(
  selectEntities,
  (entities) => entities[id]
);
