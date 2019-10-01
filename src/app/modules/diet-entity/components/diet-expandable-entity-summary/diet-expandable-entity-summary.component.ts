import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Summary } from '../../summary.model';

@Component({
  selector: 'diet-expandable-entity-summary-summary',
  template: `
      <div class="diet-expandable-summary-wrapper">
          <button mat-icon-button
                  class="diet-meal-summary-toggle"
                  (click)="toggleSummaryExpanded()"
                  [title]="(isSummaryExpanded ? 'COMMON.LESS' : 'COMMON.MORE') | translate"
          >
              <mat-icon>{{isSummaryExpanded ? 'unfold_less' : 'unfold_more'}}</mat-icon>
          </button>
          <diet-entity-summary *ngIf="!isSummaryExpanded"
                               [summaryFormGroup]="summaryFormGroup">
          </diet-entity-summary>
          <diet-entity-full-summary *ngIf="isSummaryExpanded"
                                    [readonly]="readonly"
                                    [summary]="summaryFormGroup.value"
                                    (valueChange)="onSummaryChange($event)"
                                    [showTitle]="showTitle"
          ></diet-entity-full-summary>
      </div>
  `,
  styleUrls: [ './diet-expandable-entity-summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietExpandableEntitySummaryComponent {

  @Input() summaryFormGroup!: FormGroup;
  @Input() readonly: boolean = false;
  @Input() showTitle: boolean = true;

  isSummaryExpanded: boolean = false;

  onSummaryChange(summary: Summary): void {
    this.summaryFormGroup.patchValue(summary);
  }

  toggleSummaryExpanded(): void {
    this.isSummaryExpanded = !this.isSummaryExpanded;
  }
}
