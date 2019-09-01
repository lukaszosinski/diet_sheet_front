import { Injectable } from '@angular/core';
import { RoutingService } from '../../shared/routing/routing.service';
import { DashboardNavigationDataEnum } from './dashboard-navigation-data.enum';
import { DashboardNavigationDataDictionary } from './dashboard-navigation-data';
import { NavigationData } from './navigation-data';

@Injectable()
export class DashboardNavigationService {

  readonly navigationData: DashboardNavigationDataDictionary = {
    [DashboardNavigationDataEnum.MEALS]: {
      translationKey: 'DASHBOARD.NAVIGATION.MEALS',
      navigationCallback: this.routingService.navigation.dashboard.meals.list,
    },
    [DashboardNavigationDataEnum.PRODUCTS]: {
      translationKey: 'DASHBOARD.NAVIGATION.PRODUCTS',
      navigationCallback: this.routingService.navigation.dashboard.products.list,
    },
    [DashboardNavigationDataEnum.ADD_PRODUCT]: {
      translationKey: 'DASHBOARD.NAVIGATION.ADD_PRODUCT',
      navigationCallback: this.routingService.navigation.dashboard.products.details,
    },
    [DashboardNavigationDataEnum.DAY_PLAN]: {
      translationKey: 'DASHBOARD.NAVIGATION.DAY_PLAN',
      navigationCallback: this.routingService.navigation.dashboard.dayPlan,
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
