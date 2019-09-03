import {createAction, props} from '@ngrx/store';
import {createApiErrorAction} from '../../../../api/api.actions';
import {ShoppingList} from './shopping-list.model';

export const loadShoppingLists = createAction('[ShoppingList] Load ShoppingLists');

export const generateShoppingList = createAction('[ShoppingList] Generate shopping list', props<{ fromDate: Date, toDate: Date }>());

export const generateShoppingListSuccess = createAction(
  '[ShoppingList/API] Generate shopping list SUCCESS',
  props<{ shoppingList: ShoppingList }>()
);

export const generateShoppingListError = createApiErrorAction(
  '[Product/API] Generate shopping list ERROR',
  'SHOPPING_LIST.GENERATE_ERROR'
);

export const saveShoppingList = createAction('[ShoppingList] SAVE Shopping list', props<{ shoppingList: ShoppingList }>());

export const saveShoppingListSuccess = createAction(
  '[ShoppingList/API] SAVE Shopping list SUCCESS',
  props<{ shoppingList: ShoppingList }>()
);

export const saveShoppingListError = createApiErrorAction(
  '[Product/API] SAVE Shopping list ERROR',
  'SHOPPING_LIST.SAVE_ERROR'
);
