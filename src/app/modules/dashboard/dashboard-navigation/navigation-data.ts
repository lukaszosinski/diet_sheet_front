export interface NavigationData {
  translationKey: string;
  navigationCallback: () => Promise<boolean>;
}
