import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.recuder';
import * as ShoppingListActions from '../shopping-list.actions';
import * as fromShoppingList from '../shopping-list.reducer';
import { Observable } from 'rxjs';
import { ShoppingList } from '../shopping-list.model';

@Component({
  selector: 'diet-saved-shopping-lists',
  template: `
      <div class="diet-saved-shopping-lists-content">
          <div class="diet-saved-shopping-lists-header">
              <diet-add-button class="large" (click)="onAddShoppingListClick()"
                               [title]="'SHOPPING_LIST.ADD_SHOPPING_LIST' | translate"></diet-add-button>
          </div>
          <ul class="diet-saved-shopping-lists-list">
              <li *ngFor="let shoppingList of (getLoadedShoppingLists() | async)"
                  tabindex="0"
                  class="shopping-list"
                  (click)="onShoppingListClick(shoppingList.id)"
                  (keyup.space)="onShoppingListClick(shoppingList.id)"
              >
                  <div class="shopping-list-name">{{shoppingList.name}}</div>
                  <ol class="shopping-list-items">
                      <li *ngFor="let item of shoppingList.items">
                          <div>{{item.amount}}{{getUnitTranslationKey(item.unit) | translate}}</div>
                          <div>{{item.productName}}</div>
                      </li>
                  </ol>
              </li>
          </ul>
      </div>
  `,
  styleUrls: [ './saved-shopping-lists.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedShoppingListsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(ShoppingListActions.loadShoppingLists());
  }

  getLoadedShoppingLists(): Observable<ShoppingList[]> {
    return this.store.select(fromShoppingList.selectAll);
  }

  onShoppingListClick(id: number): void {
    this.store.dispatch(ShoppingListActions.openShoppingList({ shoppingListId: id }));
  }

  onAddShoppingListClick(): void {
    this.store.dispatch(ShoppingListActions.openShoppingList({}));
  }

  getUnitTranslationKey(unit: string): string {
    return unit ? 'DIET_ENTITY.UNIT.' + unit : '';
  }
}
