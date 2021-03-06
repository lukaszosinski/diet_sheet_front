import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FridgeComponent } from './dashboard-navigation/fridge/fridge.component';
import * as fromSettingsModule from '../settings/settings.module';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: FridgeComponent },
      { path: 'settings', children: fromSettingsModule.routes },
      { path: 'shopping-list', loadChildren: () => import('./modules/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
      { path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
      { path: 'meals', loadChildren: () => import('./modules/meal/meal.module').then(m => m.MealModule) },
      { path: 'day-plan', loadChildren: () => import('./modules/day-plan/day-plan.module').then(m => m.DayPlanModule) },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {
}
