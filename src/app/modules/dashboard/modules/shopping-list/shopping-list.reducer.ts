import {Action, createFeatureSelector, createReducer} from '@ngrx/store';
import * as fromApp from '../../../../app.recuder';

export const shoppingListFeatureKey = 'shoppingList';

export interface State {

}

export const initialState: State = {

};

const shoppingListReducer = createReducer(
  initialState,

);

export function reducer(state: State | undefined, action: Action) {
  return shoppingListReducer(state, action);
}

export const selectShoppingList = createFeatureSelector<fromApp.AppState, State>(shoppingListFeatureKey);
