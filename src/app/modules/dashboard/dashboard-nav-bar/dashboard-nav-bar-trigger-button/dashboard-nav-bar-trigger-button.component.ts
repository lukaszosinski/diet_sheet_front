import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'diet-dashboard-nav-bar-trigger-button',
  templateUrl: './dashboard-nav-bar-trigger-button.component.html',
  styleUrls: [ './dashboard-nav-bar-trigger-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardNavBarTriggerButtonComponent implements OnInit {

  @Output() triggered: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.triggered.emit();
  }
}
