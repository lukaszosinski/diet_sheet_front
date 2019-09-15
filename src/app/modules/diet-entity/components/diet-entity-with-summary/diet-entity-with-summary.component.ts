import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DietEntity } from '../../diet-entity.model';

@Component({
  selector: 'diet-entity-with-summary',
  template: `
      <div class="diet-entity-content" tabindex="0" (keyup.space)="onClick($event)">
          <div *ngIf="isEditable" class="pen-icon pen-img"></div>
          <div class="diet-entity-content-name">{{dietEntity.name}}</div>
          <diet-summary [summary]="dietEntity.summary" [wrap]="true" [theme]="'alternative'"></diet-summary>
      </div>
  `,
  styleUrls: [ './diet-entity-with-summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntityWithSummaryComponent {
  @Input() isEditable!: boolean;
  @Input() dietEntity!: DietEntity;
  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.click.emit(event);
  }
}
