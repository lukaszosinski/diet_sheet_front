import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'diet-stats-meter',
  template: `
      <div class="diet-stats-meter-wrapper">
          <div class="diet-stats-meter-header">
              <span>{{meterName}}</span>
          </div>
          <meter min="0" [max]="max" [value]="value"></meter>
          <div class="diet-stats-meter-values">
              <span>{{value}} {{unit}}</span>
              <span>{{max}} {{unit}}</span>
          </div>
      </div>
  `,
  styleUrls: [ './stats-meter.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsMeterComponent {

  @Input() meterName?: string;
  @Input() value: number = 0;
  @Input() max: number = 0;
  @Input() unit: string = '';
}