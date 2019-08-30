import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Summary} from '../../../../../api/models/summary';

@Component({
  selector: 'diet-product-summary',
  template: `
    <div class="product-summary-wrapper">
        <input type="text" [(ngModel)]="summary.kcal">
        <input type="text" [(ngModel)]="summary.proteins">
        <input type="text" [(ngModel)]="summary.carbs">
        <input type="text" [(ngModel)]="summary.fat">
    </div>
  `,
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent implements OnInit {
  @Input() summary?: Summary;
  constructor() { }
  ngOnInit() {
  }

}
