export interface DashboardNavBarData {
  translationKey: string;
  navigationCallback: () => Promise<boolean>;
}
