import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingListComponent} from './shopping-list.component';
import {SavedShoppingListsComponent} from './saved-shopping-lists/saved-shopping-lists.component';


const routes: Routes = [
  { path: 'details', component: ShoppingListComponent },
  { path: '', component: SavedShoppingListsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
