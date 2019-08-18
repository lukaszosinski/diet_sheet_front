import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Summary} from "../../../../../../../api/models/summary";

@Component({
  selector: 'diet-summary',
  template: `
    <div class="content-wrapper">
        <label class="summary">
            {{summary.kcal}}
        </label>
        <label class="summary">
            {{summary.carbs}}
        </label>
        <label class="summary">
            {{summary.proteins}}
        </label>
        <label class="summary">
            {{summary.fat}}
        </label>
        <label class="summary">
            {{summary.roughage}}
        </label>
    </div>

  `,
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
  @Input() summary?: Summary;
  constructor() {}
}
