import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Summary } from '../../../../../api/models/summary';

@Component({
  selector: 'diet-summary',
  template: `
      <div class="summary-wrapper" [ngClass]="classes" *ngIf="summary">
          <div class="summary" title="{{'SUMMARY.KCAL' | translate}}">
              <div class="summary-label">{{summary.kcal}}</div>
              <div class="label-img kcal-img"></div>
          </div>
          <div class="summary" title="{{'SUMMARY.CARBS' | translate}}">
              <div class="summary-label">{{summary.carbs}}</div>
              <div class="label-img carbs-img"></div>
          </div>
          <div class="summary" title="{{'SUMMARY.PROTEINS' | translate}}">
              <div class="summary-label">{{summary.proteins}}</div>
              <div class="label-img proteins-img"></div>
          </div>
          <div class="summary" title="{{'SUMMARY.FAT' | translate}}">
              <div class="summary-label">{{summary.fat}}</div>
              <div class="label-img fat-img"></div>
          </div>
      </div>

  `,
  styleUrls: [ './summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
  @Input() summary?: Summary;
  @Input() wrap: boolean = false;
  @Input() theme: 'alternative' | 'default' = 'default';

  get classes(): { [key: string]: boolean } {
    return { 'summary-wrapper--wrap': this.wrap, 'summary-wrapper--alternative-theme': this.theme === 'alternative' };
  }
}
