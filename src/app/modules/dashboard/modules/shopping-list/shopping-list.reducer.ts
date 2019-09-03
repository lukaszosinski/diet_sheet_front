import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as fromApp from '../../../../app.recuder';
import {ShoppingList} from './shopping-list.model';
import * as ShoppingListActions from '../shopping-list/shopping-list.actions';


export const shoppingListFeatureKey = 'shoppingList';

export interface State {
  currentShoppingList?: ShoppingList;
  processing: {
    saveShoppingList: boolean
  };
}

export const initialState: State = {
  currentShoppingList: undefined,
  processing: {
    saveShoppingList: false
  }
};

const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.generateShoppingListSuccess,
    (state, {shoppingList}) => ({
      ...state, currentShoppingList: shoppingList
    })
  ),
  on(ShoppingListActions.saveShoppingList, (state) => ({
      ...state,
      processing: {...state.processing, saveShoppingList: true}
    })
  ),
  on(ShoppingListActions.saveShoppingListSuccess, (state) => ({
      ...state,
      processing: {...state.processing, saveShoppingList: false},
      currentShoppingList: undefined
    })
  ),
  on(ShoppingListActions.saveShoppingListError, (state) => ({
      ...state,
      processing: {...state.processing, saveShoppingList: false}
    })
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return shoppingListReducer(state, action);
}

export const selectShoppingList = createFeatureSelector<fromApp.AppState, State>(shoppingListFeatureKey);

export const selectCurrentShoppingList = createSelector(
  selectShoppingList,
  (state) => state.currentShoppingList ? state.currentShoppingList : undefined
);

export const selectShouldDisplayShoppingList = createSelector(
  selectShoppingList,
  (state) => !!state.currentShoppingList
);
