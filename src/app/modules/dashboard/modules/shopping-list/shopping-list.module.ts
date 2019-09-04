import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/shopping-list.reducer';
import {SharedLazyModule} from '../../../shared/shared-lazy.module';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import {ShoppingListComponent} from './shopping-list.component';
import {EffectsModule} from '@ngrx/effects';
import {ShoppingListEffects} from './shopping-list.effects';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromShoppingList.shoppingListFeatureKey, fromShoppingList.reducer),
    EffectsModule.forFeature([ ShoppingListEffects ]),
    ShoppingListRoutingModule,
    SharedLazyModule,
    SharedModule
  ]
})
export class ShoppingListModule { }
