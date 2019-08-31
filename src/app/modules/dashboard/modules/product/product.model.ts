import { Summary } from '../../../../api/models/summary';
import { ProductUnitEnum } from './product-unit.enum';

export interface Product {
  id?: number;
  name: string;
  summary: Summary;
  description?: string;
  productUnit: ProductUnitEnum;
}
