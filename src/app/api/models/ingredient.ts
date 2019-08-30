import { Product } from '../../modules/dashboard/modules/product/product.model';

export interface Ingredient {
  id: number;
  product: Product;
  amount: number;
}
