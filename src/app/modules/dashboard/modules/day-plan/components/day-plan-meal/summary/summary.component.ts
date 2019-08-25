import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Summary} from '../../../../../../../api/models/summary';

@Component({
  selector: 'diet-summary',
  template: `
    <div class="summary-wrapper">
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
        <div class="summary" title="{{'SUMMARY.ROUGHAGE' | translate}}">
            <div class="summary-label">{{summary.roughage}}</div>
            <div class="label-img roughage-img"></div>
        </div>
    </div>

  `,
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
  @Input() summary?: Summary;
  constructor() {}
}
