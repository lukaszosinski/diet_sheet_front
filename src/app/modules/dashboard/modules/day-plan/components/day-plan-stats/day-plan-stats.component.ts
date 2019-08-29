import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Summary } from '../../../../../../api/models/summary';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app.recuder';
import * as fromDayPlan from '../../day-plan.reducer';
import * as DayPlanActions from '../../day-plan.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'diet-day-plan-stats',
  template: `
      <div class="day-plan-summary-wrapper">
          <button class="summary-arrow"
                  [class.rotated-summary-arrow]="(shouldShowStats$ | async)"
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

  @Input() summary!: Summary;
  @Input() eatenMealsSummary?: Summary;

  shouldShowStats$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.shouldShowStats$ = this.store.select(fromDayPlan.selectShouldShowStats);
  }

  onArrowClick(): void {
    this.store.dispatch(DayPlanActions.toggleStatsVisibility());
  }
}

interface MeterData {
  translationKey: string;
  propertyName: keyof Summary;
}
