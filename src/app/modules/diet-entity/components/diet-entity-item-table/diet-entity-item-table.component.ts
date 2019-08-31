import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DietEntityItem } from './diet-entity-item';

@Component({
  selector: 'diet-entity-item-table',
  template: `
      <div class="diet-entity-item-table">
          <div class="diet-entity-item-table-title">{{tableTitle}}</div>
          <div class="diet-entity-item-table-wrapper">
              <div class="diet-entity-item-table-header-row">
                  <div *ngFor="let header of columnHeaders; let i = index"
                       class="diet-entity-item-table-header-{{i}}">{{header}}</div>
              </div>
              <div class="diet-entity-item-table-data-row" *ngFor="let item of items">
                  <div class="diet-entity-item-table-row-prefix"></div>
                  <div class="diet-entity-item-table-row-name">{{item.name}}</div>
                  <div class="diet-entity-item-table-row-quantity">{{item.quantity}}{{item.unit}}</div>
              </div>
          </div>
          <diet-add-button (click)="onAddButtonClick($event)"></diet-add-button>
      </div>
  `,
  styleUrls: [ './diet-entity-item-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntityItemTableComponent {
  @Input() tableTitle: string = '';
  @Input() columnHeaders: string[] = [];
  @Input() items: DietEntityItem[] = [];
  @Output() addButtonClick: EventEmitter<Event> = new EventEmitter<Event>();

  onAddButtonClick($event: Event): void {
    this.addButtonClick.emit($event);
  }
}
