import { Component, Input, OnInit } from '@angular/core';
import { DashboardNavBarData } from './models/dashboard-nav-bar-data';

@Component({
  selector: 'diet-dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styleUrls: [ './dashboard-nav-bar.component.scss' ]
})
export class DashboardNavBarComponent implements OnInit {

  @Input() data: DashboardNavBarData[] = [];

  constructor() { }

  ngOnInit() {

  }

  redirect(redirectCallback: () => Promise<boolean>) {
    redirectCallback();
  }

}
