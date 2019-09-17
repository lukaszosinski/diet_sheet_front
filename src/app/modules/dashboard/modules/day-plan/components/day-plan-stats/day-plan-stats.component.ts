import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Summary } from '../../../../../diet-entity/summary.model';
import { DietLimits } from '../../../../../settings/models/diet-limits.model';

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
                            [value]="getValue(meterData.propertyName)"
                            [total]="getTotalValue(meterData.propertyName)"
                            [lowValue]="getLowValue(meterData.propertyName)"
                            [highValue]="getHighValue(meterData.propertyName)"
                            [meterName]="meterData.translationKey | translate"
                            [unit]="meterData.unit"
          ></diet-stats-meter>
      </div>
  `,
  styleUrls: [ './day-plan-stats.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DayPlanStatsComponent {

  readonly metersData: Readonly<MeterData>[] = [
    { propertyName: 'kcal', unit: 'kcal', translationKey: 'SUMMARY.kcal' },
    { propertyName: 'proteins', unit: 'g', translationKey: 'SUMMARY.proteins' },
    { propertyName: 'carbs', unit: 'g', translationKey: 'SUMMARY.carbs' },
    { propertyName: 'fat', unit: 'g', translationKey: 'SUMMARY.fat' },
    { propertyName: 'sugar', unit: 'g', translationKey: 'SUMMARY.sugar' },
    { propertyName: 'saturatedFat', unit: 'g', translationKey: 'SUMMARY.saturatedFat' },
    { propertyName: 'salt', unit: 'mg', translationKey: 'SUMMARY.salt' },
    { propertyName: 'roughage', unit: 'g', translationKey: 'SUMMARY.roughage' },
    { propertyName: 'potassium', unit: 'mg', translationKey: 'SUMMARY.potassium' },
    { propertyName: 'calcium', unit: 'mg', translationKey: 'SUMMARY.calcium' },
    { propertyName: 'vitaminD', unit: 'µg', translationKey: 'SUMMARY.vitaminD' },
    { propertyName: 'vitaminC', unit: 'µg', translationKey: 'SUMMARY.vitaminC' },
  ];

  @Input() isExpanded: boolean = false;
  @Input() summary!: Summary;
  @Input() dietLimits?: DietLimits;
  @Input() eatenMealsSummary!: Summary;
  @Output() toggleExpansion: EventEmitter<void> = new EventEmitter();

  onArrowClick(): void {
    this.toggleExpansion.emit();
  }

  getValue(propertyName: keyof Summary): number {
    return this.eatenMealsSummary[propertyName]!;
  }

  getLowValue(propertyName: keyof Summary): number | undefined {
    return this.dietLimits && this.dietLimits.minLimits[propertyName];
  }

  getTotalValue(propertyName: keyof Summary): number {
    return this.summary[propertyName]!;
  }

  getHighValue(propertyName: keyof Summary): number | undefined {
    return this.dietLimits && this.dietLimits.maxLimits[propertyName] || undefined;
  }
}

interface MeterData {
  translationKey: string;
  propertyName: keyof Summary;
  unit: 'g' | 'kcal' | 'mg' | 'µg';
}
