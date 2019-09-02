export interface ShoppingList {
  id?: number;
  name: string;
  items: ShoppingListItem[];
}

export interface ShoppingListItem {
  id?: number;
  productName: string;
  amount: number;
}
