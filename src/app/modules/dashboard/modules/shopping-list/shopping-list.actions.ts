import { createAction, props } from '@ngrx/store';
import { createApiErrorAction } from '../../../../api/api.actions';
import { ShoppingList } from './shopping-list.model';


export const loadShoppingList = createAction('[ShoppingList/API] Load ShoppingList', props<{ id: number }>());

export const loadShoppingLists = createAction('[ShoppingList/API] Load ShoppingLists');

export const loadShoppingListsSuccess = createAction('[ShoppingList/API] Load shopping lists SUCCESS', props<{ shoppingLists: ShoppingList[] }>());

export const loadShoppingListsError = createApiErrorAction('[ShoppingList/API] Load shopping list ERROR', 'SHOPPING_LIST.LOAD_ERROR');

export const clearGeneratedShoppingList = createAction('[ShoppingList] Clear generated shopping list');

export const generateShoppingList = createAction('[ShoppingList/API] Generate shopping list', props<{ fromDate: Date, toDate: Date }>());

export const generateShoppingListSuccess = createAction('[ShoppingList/API] Generate shopping list SUCCESS', props<{ shoppingList: ShoppingList }>());

export const generateShoppingListError = createApiErrorAction('[Product/API] Generate shopping list ERROR', 'SHOPPING_LIST.GENERATE_ERROR');

export const saveShoppingList = createAction('[ShoppingList/API] SAVE Shopping list', props<{ shoppingList: ShoppingList }>());

export const updateShoppingList = createAction('[ShoppingList/API] UPDATE Shopping list', props<{ shoppingList: ShoppingList }>());

export const upsertShoppingListSuccess = createAction('[ShoppingList/API] UPSERT Shopping list SUCCESS', props<{ shoppingList: ShoppingList }>());

export const upsertShoppingListError = createApiErrorAction('[ShoppingList/API] UPSERT Shopping list ERROR', 'SHOPPING_LIST.SAVE_ERROR');

export const openShoppingList = createAction('[ShoppingList] Open Shopping list', props<{ shoppingListId?: number }>());
