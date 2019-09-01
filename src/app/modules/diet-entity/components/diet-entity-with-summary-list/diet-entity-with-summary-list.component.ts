import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DietEntity } from '../../diet-entity.model';

@Component({
  selector: 'diet-entity-with-summary-list',
  template: `
      <ul class="diet-entity-with-summary-list-content">
          <li *ngFor="let entity of dietEntities">
              <diet-entity-with-summary
                      class="diet-entity-with-summary-list-item-content"
                      [dietEntity]="entity"
                      (click)="onEntityClick(entity)"
              ></diet-entity-with-summary>
          </li>
      </ul>
  `,
  styleUrls: [ './diet-entity-with-summary-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntityWithSummaryListComponent<T extends DietEntity> {

  @Input() dietEntities!: T[];
  @Output() entityClick: EventEmitter<T> = new EventEmitter<T>();

  onEntityClick(dietEntity: T): void {
    this.entityClick.emit(dietEntity);
  }
}
