import {ShoppingListItem} from './shopping-list-item/shopping-list-item.model';

export interface ShoppingList {
  id?: number;
  name?: string;
  items: ShoppingListItem[];
}

