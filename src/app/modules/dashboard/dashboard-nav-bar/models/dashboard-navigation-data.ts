export interface DashboardNavigationData {
  translationKey: string;
  navigationCallback: () => Promise<boolean>;
}
