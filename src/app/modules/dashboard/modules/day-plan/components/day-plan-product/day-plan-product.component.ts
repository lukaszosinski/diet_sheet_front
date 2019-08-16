import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../../../../api/models/product';

@Component({
  selector: 'diet-day-plan-product',
  template: `
      <p>
          day-plan-product works!
      </p>
  `,
  styleUrls: [ './day-plan-product.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPlanProductComponent {
  @Input() product?: Product;
}
