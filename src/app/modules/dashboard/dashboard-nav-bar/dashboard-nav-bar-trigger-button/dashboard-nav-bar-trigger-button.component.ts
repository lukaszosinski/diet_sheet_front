import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'diet-dashboard-nav-bar-trigger-button',
  template: `
      <button class="diet-dashboard-nav-bar-trigger-button">
          x
      </button>
  `,
  styleUrls: [ './dashboard-nav-bar-trigger-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardNavBarTriggerButtonComponent {
}
