import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardNavigationService } from '../dashboard-navigation.service';
import { DashboardNavigationDataDictionary } from '../dashboard-navigation-data';

@Component({
  selector: 'diet-fridge',
  template: `
      <p>
          fridge works!
      </p>
  `,
  styleUrls: [ './fridge.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FridgeComponent {

  readonly navigationData: DashboardNavigationDataDictionary;

  constructor(dashboardNavigationService: DashboardNavigationService) {
    this.navigationData = dashboardNavigationService.getNavigationDataDictionary();
  }
}
