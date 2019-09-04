import { DashboardNavigationDataEnum } from './dashboard-navigation-data.enum';
import { NavigationData } from './navigation-data';

export type DashboardNavigationDataDictionary = Readonly<{
  [key in DashboardNavigationDataEnum]: NavigationData;
}>;
