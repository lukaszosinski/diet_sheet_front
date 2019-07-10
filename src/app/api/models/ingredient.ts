import { Product } from './product';

export interface Ingredient {
  id: number;
  product: Product;
  amount: number;
}
