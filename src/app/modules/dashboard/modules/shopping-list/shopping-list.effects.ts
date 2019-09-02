import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ShoppingListActions from '../shopping-list/shopping-list.actions';
import {map, mergeMap} from 'rxjs/operators';
import {catchApiError} from '../../../../api/api.actions';
import {ShoppingListService} from '../../../../api/services/shopping-list.service';



@Injectable()
export class ShoppingListEffects {

  generateShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.generateShoppingList),
    mergeMap(({ fromDate, toDate }) => this.shoppingList.generateShoppingListForDateRange(fromDate, toDate).pipe(
      map(shoppingList => ShoppingListActions.generateShoppingListSuccess({ shoppingList })),
      catchApiError(ShoppingListActions.generateShoppingListError)
    ))
  ));


  constructor(private actions$: Actions,
              private shoppingList: ShoppingListService) {}

}
