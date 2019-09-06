import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ShoppingListActions from '../shopping-list/shopping-list.actions';
import {map, mergeMap, tap} from 'rxjs/operators';
import {catchApiError} from '../../../../api/api.actions';
import {ShoppingListService} from '../../../../api/services/shopping-list.service';
import {RoutingService} from '../../../shared/routing/routing.service';



@Injectable()
export class ShoppingListEffects {

  loadShoppingLists$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.loadShoppingLists),
    mergeMap(() => this.shoppingList.getShoppingLists().pipe(
      map(shoppingLists => ShoppingListActions.loadShoppingListsSuccess({ shoppingLists })),
      catchApiError(ShoppingListActions.loadShoppingListsError)
    ))
  ));

  loadShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.loadShoppingList),
    mergeMap(({id}) => this.shoppingList.getShoppingList(id).pipe(
      map(shoppingList => ShoppingListActions.loadShoppingListSuccess({ shoppingList })),
      catchApiError(ShoppingListActions.loadShoppingListError)
    ))
  ));

  generateShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.generateShoppingList),
    mergeMap(({ fromDate, toDate }) => this.shoppingList.generateShoppingListForDateRange(fromDate, toDate).pipe(
      map(shoppingList => ShoppingListActions.generateShoppingListSuccess({ shoppingList })),
      catchApiError(ShoppingListActions.generateShoppingListError)
    ))
  ));

  saveShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.saveShoppingList),
    mergeMap(({ shoppingList }) => this.shoppingList.saveShoppingList(shoppingList).pipe(
      map(shoppingList => ShoppingListActions.saveShoppingListSuccess({ shoppingList })),
      catchApiError(ShoppingListActions.saveShoppingListError)
    ))
  ));

  updateShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.updateShoppingList),
    mergeMap(({ shoppingList }) => this.shoppingList.updateShoppingList(shoppingList).pipe(
      map(shoppingList => ShoppingListActions.updateShoppingListSuccess({ shoppingList })),
      catchApiError(ShoppingListActions.updateShoppingListError)
    ))
  ));

 openShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.openShoppingList),
    tap(({ shoppingListId }) => this.goToShoppingList(shoppingListId))
  ), { dispatch: false });


  constructor(private actions$: Actions,
              private shoppingList: ShoppingListService,
              private routingService: RoutingService) {

  }

  private goToShoppingList(shoppingListId: number): void {
    this.routingService.navigation.dashboard.shoppingList.details(shoppingListId);
  }

}
