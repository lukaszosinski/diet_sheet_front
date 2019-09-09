import { Injectable } from '@angular/core';
import { RoutingService } from '../../shared/routing/routing.service';
import { DashboardNavigationDataEnum } from './dashboard-navigation-data.enum';
import { DashboardNavigationDataDictionary } from './dashboard-navigation-data';
import { NavigationData } from './navigation-data';

@Injectable()
export class DashboardNavigationService {

  readonly navigationData: DashboardNavigationDataDictionary = {
    [DashboardNavigationDataEnum.FRIDGE]: {
      translationKey: 'DASHBOARD.NAVIGATION.FRIDGE',
      navigationCallback: this.routingService.navigation.dashboard.fridge,
    },
    [DashboardNavigationDataEnum.DAY_PLAN]: {
      translationKey: 'DASHBOARD.NAVIGATION.DAY_PLAN',
      navigationCallback: this.routingService.navigation.dashboard.dayPlan,
    },
    [DashboardNavigationDataEnum.SAVED_SHOPPING_LISTS]: {
      translationKey: 'DASHBOARD.NAVIGATION.SAVED_SHOPPING_LISTS',
      navigationCallback: this.routingService.navigation.dashboard.shoppingList.list,
    },
    [DashboardNavigationDataEnum.MEALS]: {
      translationKey: 'DASHBOARD.NAVIGATION.MEALS',
      navigationCallback: this.routingService.navigation.dashboard.meals.list,
    },
    [DashboardNavigationDataEnum.PRODUCTS]: {
      translationKey: 'DASHBOARD.NAVIGATION.PRODUCTS',
      navigationCallback: this.routingService.navigation.dashboard.products.list,
    },
    [DashboardNavigationDataEnum.MY_DIET]: {
      translationKey: 'DASHBOARD.NAVIGATION.MY_DIET',
      navigationCallback: () => Promise.resolve(false),
    },
    [DashboardNavigationDataEnum.SETTINGS]: {
      translationKey: 'DASHBOARD.NAVIGATION.SETTINGS',
      navigationCallback: this.routingService.navigation.dashboard.settings,
    },
  };

  constructor(private routingService: RoutingService) {
  }

  getNavigationDataDictionary(): DashboardNavigationDataDictionary {
    return this.navigationData;
  }

  getNavigationDataList(): NavigationData[] {
    return Object.values(this.navigationData);
  }
}
