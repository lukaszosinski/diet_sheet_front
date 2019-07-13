import { Component, OnInit } from '@angular/core';
import { DashboardNavBarData } from './dashboard-nav-bar/models/dashboard-nav-bar-data';
import { RoutingService } from '../shared/services/routing.service';

@Component({
  selector: 'diet-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  readonly navBarData: DashboardNavBarData[] = [
    {
      translationKey: 'DASHBOARD.NAVIGATION.MEALS',
      navigationCallback: this.routingService.navigation.dashboard.meals.list,
    },
    {
      translationKey: 'DASHBOARD.NAVIGATION.PRODUCTS',
      navigationCallback: this.routingService.navigation.dashboard.products.list,
    },
  ];

  constructor(private routingService: RoutingService) {}

  ngOnInit() {
  }

}
