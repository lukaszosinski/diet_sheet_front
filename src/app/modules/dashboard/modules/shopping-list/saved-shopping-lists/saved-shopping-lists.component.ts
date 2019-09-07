import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../app.recuder';
import * as ShoppingListActions from '../shopping-list.actions';
import * as fromShoppingList from '../shopping-list.reducer';
import {Observable} from 'rxjs';
import {ShoppingList} from '../shopping-list.model';

@Component({
  selector: 'diet-saved-shopping-lists',
  template: `
      <ul>
          <li *ngFor="let shoppingList of (getLoadedShoppingLists() | async)">
              <div (click)="onShoppingListClick(shoppingList.id)">{{shoppingList.id}}</div>
          </li>
      </ul>
  `,
  styleUrls: ['./saved-shopping-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedShoppingListsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(ShoppingListActions.loadShoppingLists());
  }

  getLoadedShoppingLists(): Observable<ShoppingList[]> {
    return this.store.select(fromShoppingList.selectLoadedShoppingLists);
  }

  onShoppingListClick(id: number): void {
    this.store.dispatch(ShoppingListActions.openShoppingList({shoppingListId: id}));
  }

}
