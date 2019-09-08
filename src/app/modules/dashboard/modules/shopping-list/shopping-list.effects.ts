import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ShoppingListActions from '../shopping-list/shopping-list.actions';
import { map, mergeMap, tap } from 'rxjs/operators';
import { catchApiError } from '../../../../api/api.actions';
import { ShoppingListService } from '../../../../api/services/shopping-list.service';
import { RoutingService } from '../../../shared/routing/routing.service';


@Injectable()
export class ShoppingListEffects {

  loadShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.loadShoppingList),
    mergeMap(({ id }) => this.shoppingList.getShoppingList(id).pipe(
      map(shoppingList => ShoppingListActions.loadShoppingListsSuccess({ shoppingLists: [ shoppingList ] })),
      catchApiError(ShoppingListActions.loadShoppingListsError)
    ))
  ));

  loadShoppingLists$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.loadShoppingLists),
    mergeMap(() => this.shoppingList.getShoppingLists().pipe(
      map(shoppingLists => ShoppingListActions.loadShoppingListsSuccess({ shoppingLists })),
      catchApiError(ShoppingListActions.loadShoppingListsError)
    ))
  ));

  generateShoppingList$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.generateShoppingList),
    mergeMap(({ fromDate, toDate }) => this.shoppingList.generateShoppingListForDateRange(fromDate, toDate).pipe(
      map(shoppingList => ShoppingListActions.generateShoppingListSuccess({ shoppingList })),
      catchApiError(ShoppingListActions.generateShoppingListError)
    ))
  ));

  saveShoppingListAndRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.saveShoppingListAndRedirect),
    mergeMap((action) => this.shoppingList.saveShoppingList(action.shoppingList).pipe(
      map(shoppingList => ShoppingListActions.upsertShoppingListSuccess({ shoppingList })),
      tap(() => this.redirectFromShoppingList()),
      catchApiError(ShoppingListActions.upsertShoppingListError)
    ))
  ));

  updateShoppingListAndRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListActions.updateShoppingListAndRedirect),
    mergeMap((action) => this.shoppingList.updateShoppingList(action.shoppingList).pipe(
      map(shoppingList => ShoppingListActions.upsertShoppingListSuccess({ shoppingList })),
      tap(() => this.redirectFromShoppingList()),
      catchApiError(ShoppingListActions.upsertShoppingListError)
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

  private goToShoppingList(shoppingListId?: number): void {
    this.routingService.navigation.dashboard.shoppingList.details(shoppingListId);
  }

  private redirectFromShoppingList(): void {
    this.routingService.navigation.dashboard.shoppingList.list();
  }
}
