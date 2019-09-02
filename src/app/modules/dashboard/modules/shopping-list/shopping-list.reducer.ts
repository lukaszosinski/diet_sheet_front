import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as fromApp from '../../../../app.recuder';
import {ShoppingList} from './shopping-list.model';
import * as ShoppingListActions from '../shopping-list/shopping-list.actions';


export const shoppingListFeatureKey = 'shoppingList';

export interface State {
  currentShoppingList?: ShoppingList;
}

export const initialState: State = {
  currentShoppingList: undefined,
};

const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.generateShoppingListSuccess,
    (state, {shoppingList}) => ({
      ...state, currentShoppingList: shoppingList
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
