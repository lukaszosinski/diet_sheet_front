import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DietEntity } from '../../diet-entity.model';

@Component({
  selector: 'diet-entity-with-summary-list',
  template: `
      <div class="diet-entity-with-summary-list-content">
          <div class="diet-meal-list-header">
              <diet-add-button class="large" (click)="onAddEntityClick()" [title]="addButtonTitle"></diet-add-button>
          </div>
          <ng-container *ngFor="let entity of dietEntities">
              <diet-entity-with-summary class="diet-entity-with-summary"
                      [dietEntity]="entity"
                      (click)="onEntityClick(entity)"
              ></diet-entity-with-summary>
          </ng-container>
      </div>
  `,
  styleUrls: [ './diet-entity-with-summary-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntityWithSummaryListComponent<T extends DietEntity> {

  @Input() addButtonTitle: string = '';
  @Input() dietEntities!: T[];
  @Output() entityClick: EventEmitter<T> = new EventEmitter<T>();
  @Output() addEntity: EventEmitter<void> = new EventEmitter<void>();

  onEntityClick(dietEntity: T): void {
    this.entityClick.emit(dietEntity);
  }

  onAddEntityClick(): void {
    this.addEntity.emit();
  }
}
