import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Summary } from '../../../../../../api/models/summary';

@Component({
  selector: 'diet-day-plan-stats',
  template: `
      <div class="day-plan-summary-wrapper">
          <button class="summary-arrow"
                  [class.rotated-summary-arrow]="isExpanded"
                  (click)="onArrowClick()"
                  title="{{'DAY_PLAN.TOGGLE_SUMMARY' | translate}}">
          </button>
          <diet-stats-meter *ngFor="let meterData of metersData"
                            class="diet-stats-meter"
                            [value]="eatenMealsSummary[meterData.propertyName]"
                            [max]="summary[meterData.propertyName]"
                            [meterName]="meterData.translationKey | translate"
          ></diet-stats-meter>
      </div>
  `,
  styleUrls: [ './day-plan-stats.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DayPlanStatsComponent {

  readonly metersData: Readonly<MeterData>[] = [
    { propertyName: 'kcal', translationKey: 'SUMMARY.KCAL' },
    { propertyName: 'proteins', translationKey: 'SUMMARY.PROTEINS' },
    { propertyName: 'carbs', translationKey: 'SUMMARY.CARBS' },
    { propertyName: 'fat', translationKey: 'SUMMARY.FAT' },
  ];

  @Input() isExpanded: boolean = false;
  @Input() summary!: Summary;
  @Input() eatenMealsSummary?: Summary;
  @Output() toggleExpansion: EventEmitter<void> = new EventEmitter();

  onArrowClick(): void {
    this.toggleExpansion.emit();
  }
}

interface MeterData {
  translationKey: string;
  propertyName: keyof Summary;
}
